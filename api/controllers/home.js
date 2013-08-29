var response = require("../adapters/response");

module.exports = {

	index: function(req, res) {
	
		response(res).json({
			result: "success"
		});
	}
}