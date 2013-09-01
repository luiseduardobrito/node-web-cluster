var response = require("../adapters/response");

module.exports = {

	index: function(req, res) {
	
		response(res).json({
			result: "success"
		});
	},

	view: function(req, res) {
	
		res.render("home/view", {title: "view", layout: "layout.ejs"}, 
			function(err, html) {
				res.send(html);
		})
	},
}