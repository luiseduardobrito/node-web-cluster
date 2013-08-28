var model = require("../adapters/model");

module.exports = {

	index: function(req, res) {

		if(req.cookies.authenticated) {

			var _user = req.cookies.user;

			if(_user.password)
				delete _user.password;

			res.json({

				result: "success",
				user: _user
			});
		}

		else {
			res.json({

				result: "error",
				description: "you're not logged in"
			});
		}
	},

	signin: function(req, res) {

		try {

			var user = model.create("user", {
				name: req.param("name"),
				email: req.param("email"),
				password: req.param("password"),
				access_token: req.param("access_token") || ""
			});

			model.find("user", {email: user.email}, function(r) {

				if(r.length != 0) {

					res.json({
						result: "error",
						description: "email already in database"
					})

					return;
				}

				else {
					model.save(user, function(r){

						res.cookie("authenticated", true);
						res.cookie("user", user);

						res.json({
							result: "success",
							db: r
						});
					})
				}
			})
		}

		catch(e) {

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

				}

				res.cookie("authenticated", true);
				res.cookie("user", result[0]);

				res.json({
					result: "success",
					user: result[0]
				})
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
		
		res.clearCookie("authenticated");
		res.clearCookie("user");

		res.json({
			result: "success"
		})
	}
}