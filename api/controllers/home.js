var response = require("../adapters/response");

module.exports = {

	index: function(req, res) {
	
		response(res).json({
			result: "success"
		});
	},

	view: function(req, res) {
	
		response(res).view("home/view", {
			title: "node-web-cluster"
		});
	},
}