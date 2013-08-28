module.exports = function(req, res, ok) {

	if(req.cookies.user.role && req.cookies.user.role == "root")
		ok();

	else {
		res.json({

			result: "error",
			description: "forbidden access"
		});
	}

}