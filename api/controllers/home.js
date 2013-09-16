var response = require("../adapters/response");

module.exports = {

	index: function(req, res) {
	
		response(res).view("home/index", {
			title: "node-web-cluster",
			message: "Welcome to the index page!"
		});
	},

	view: function(req, res) {
	
		response(res).view("home/view", {
			title: "node-web-cluster"
		});
	},
}