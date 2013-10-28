var response = require("../adapters/response");
var model = require("../adapters/mongoose");
var policy = require("../policies/");

var lang = require("../../language").getDefault();

module.exports = {

	not_found: function(req, res) {
	
		response(res).json({
			result: "error",
			message: "method not found",
			code: 404
		});
	}
}