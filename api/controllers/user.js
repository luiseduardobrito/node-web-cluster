var crypto = require("crypto");

var model = require("../adapters/model");
var policy = require("../policies/");
var response = require("../adapters/response");

module.exports = {

	index: function(req, res) {

		try {
			policy(req, res).check(["authenticated"], function() { 

				var _user = model.find("user",  {

					_id: req.cookies.user_id

				}, function(r) {

					if(!r[0])
						throw new Error("Error selecting user")

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
				message: e.toString()
			})

			return;
		}
	},

	signin: function(req, res) {

		try {

			var sha256 = crypto.createHash('sha256').update(req.param("password")).digest("hex");

			var user = model.create("user", {
				name: req.param("name"),
				email: req.param("email"),
				password: sha256,
				access_token: req.param("access_token") || ""
			});

			var _res = res;
			var _user = user;

			model.find("user", {email: _user.email}, function(r) {

				if(r.length != 0) {

					_res.json({
						result: "error",
						message: "email already in database"
					})

					return;
				}

				else {

					model.save(_user, function(r){

						_res.json({
							result: "success",
							message: "user created successfully"
						});
					})
				}
			})
		}

		catch(e) {

			response(res).json({
				result: "error",
				message: e.toString()
			})

			return;
		}
	},

	login: function(req, res) {

		try {

			var sha256 = crypto.createHash('sha256').update(req.param("password")).digest("hex");

			model.find("user", {

				email: req.param("email"),
				password: sha256,

			}, function(result) {

				if(!result[0] || result.length < 1) {

					response(res).json({
						result: "error",
						message: "invalid credentials"
					});

					return;
				}

				res.cookie("authenticated", true);
				res.cookie("user_id", result[0]._id);
				res.cookie("user", result[0]);

				response(res).json({

					result: "success",
					message: "user logged in successfully",
					data: {
						user: result[0]._sanitize(result[0])
					}
				})

				return;
			});
		}
		catch(err) {

			response(res).json({
				result: "error",
				message: err.toString()
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
				message: "user successfully logged out"
			})
		});
	}
}