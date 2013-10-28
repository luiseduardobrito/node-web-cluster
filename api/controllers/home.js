var response = require("../adapters/response");
var model = require("../adapters/mongoose");
var policy = require("../policies/");

var lang = require("../../language").getDefault();

module.exports = {

	index: function(req, res) {
	
		response(res).json({
			title: lang.home.title,
			message: lang.home.message
		});
	}
}