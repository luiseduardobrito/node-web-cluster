var crypto = require("crypto");

var model = require("../adapters/model");
var policy = require("../policies/");
var response = require("../adapters/response");

var language = require("../../language");
var lang = language.getDefault();

module.exports = {

	index: function(req, res) {

		try {
			policy(req, res).check(["authenticated"], function() { 

				var _user = model.find("user",  {

					_id: req.cookies.user_id

				}, function(r) {

					if(!r[0])
						throw new Error(lang.error.internal || "Error selecting user")

					response(res).json({

						result: "success",
						data: {
							user: r[0]._sanitize(r[0])
						}
					});

				});
			})
		}

		catch(e) {

			response(res).json({
				result: "error",
				message: e.message.toString()
			})

			return;
		}
	},

	signup: function(req, res) {

		try {
			var user = model.create("user", {
				name: req.param("name"),
				email: req.param("email"),
				password: req.param("password"),
				credit: req.param("credit"),
				access_token: req.param("access_token") || ""
			});

			var _res = res;
			var _user = user;

			model.find("user", {email: _user.email}, function(r) {

				if(r.length != 0) {

					response(_res).json({
						result: "error",
						message: lang.user.email_registered || "email already registered"
					})

					return;
				}

				else {

					model.save(_user, function(r){

						response(_res).json({
							result: "success",
							message: lang.user.create_success || "user created successfully"
						});
					})
				}
			})
		}

		catch(e) {

			response(res).json({
				result: "error",
				message: e.message.toString()
			})

			return;
		}
	},

	login: function(req, res) {

		try {

			model.find("user", {

				email: req.param("email"),
				password: req.param("password"),

			}, function(result) {

				if(!result[0] || result.length < 1) {

					response(res).json({
						result: "error",
						message: lang.user.invalid_credentials || "invalid credentials"
					});

					return;
				}

				res.cookie("authenticated", true);
				res.cookie("user_id", result[0]._id);
				res.cookie("user", result[0]);

				response(res).json({

					result: "success",
					message: lang.user.login_success || "user logged in successfully",
					data: {
						user: result[0]._sanitize(result[0])
					}
				})

				return;
			});
		}
		
		catch(e) {

			response(res).json({
				result: "error",
				message: e.message.toString(),
				code: 500
			});
		}
	},

	logout: function(req, res) {
		
		policy(req, res).check("authenticated", function() {

			res.clearCookie("authenticated");
			res.clearCookie("user_id");
			res.clearCookie("user");

			response(res).json({
				result: "success",
				message: lang.user.logout_success || "user successfully logged out"
			})
		});
	}
}