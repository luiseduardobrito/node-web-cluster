module.exports = {
	
	index: function(req, res) {

		res.json({

			result: "error",
			description: "unknown"

		});
	},

	not_found: function(req, res) {

		res.json({

			result: "error",
			code: 404,
			description: "not found"

		});
	}
}