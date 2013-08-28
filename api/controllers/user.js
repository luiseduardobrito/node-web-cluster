var model = require("../adapters/model");
var policy = require("../policies/");

module.exports = {

	index: function(req, res) {

		policy(req, res).check("authenticated", function() {

			var _user = req.cookies.user;

			if(_user.password)
				delete _user.password;

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

			model.find("user", {email: user.email}, function(r) {

				if(r.length != 0) {

					_res.json({
						result: "error",
						description: "email already in database"
					})

					return;
				}

				else {
					model.save(user, function(r){

						_res.cookie("authenticated", true);
						_res.cookie("user", user);

						_res.json({
							result: "success",
							db: r
						});
					})
				}
			})
		}

		catch(e) {

			res.json({
				result: "error",
				description: e
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