var model = require("../adapters/model");
var policy = require("../policies/");

module.exports = {

	index: function(req, res) {

		policy(req, res).check(["authenticated", "root"], function() {

			var _user = req.cookies.user;

			res.json({

				result: "success",
				user: _user
			});

		})
	},

	signin: function(req, res) {

		try {

			var user = model.create("user", {
				name: req.param("name"),
				email: req.param("email"),
				password: req.param("password"),
				access_token: req.param("access_token") || ""
			});

			var _res = res;
			var _user = user;

			model.find("user", {email: _user.email}, function(r) {

				if(r.length != 0) {

					_res.json({
						result: "error",
						description: "email already in database"
					})

					return;
				}

				else {

					model.save(_user, function(r){

						_res.json({
							result: "success"
						});
					})
				}
			})
		}

		catch(e) {

			res.json({
				result: "error",
				description: e.toString()
			})

			return;
		}
	},

	login: function(req, res) {

		try {

			model.find("user", {

				email: req.param("email"),

			}, function(result) {

				console.log(result)

				if(!result[0] || result.length < 1) {

					res.json({
						result: "error",
						description: "invalid credentials"
					});

					return;
				}

				res.cookie("authenticated", true);
				res.cookie("user", result[0]);

				res.json({
					result: "success",
					user: result[0]
				})

				return;
			});
		}
		catch(err) {

			res.json({
				result: "error",
				description: err
			});
		}
	},

	logout: function(req, res) {
		
		policy(req, res).check("authenticated", function() {

			res.clearCookie("authenticated");
			res.clearCookie("user");

			res.json({
				result: "success"
			})
		});
	}
}