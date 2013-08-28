module.exports = function(req, res, ok) {

	if(req.cookies.authenticated == "true") {

		console.log("authenticated method")
		ok();
	}

	else {
		res.json({

			result: "error",
			description: "you're not logged in"
		});
	}

}