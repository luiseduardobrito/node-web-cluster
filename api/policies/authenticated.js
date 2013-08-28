module.exports = function(req, res, ok) {

	if(req.cookies.authenticated == "true")
		ok();

	else {
		res.json({

			result: "error",
			description: "you're not logged in"
		});
	}

}