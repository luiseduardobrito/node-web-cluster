var config = {
	model: "response"
};

var language = require("../../language");
var lang = language.getDefault();

var mongoose = require("./mongoose");
var ResponseSchema = mongoose.model("response");

var Response = function(res) {
	
	var _res = res;
	var exports = {};

	function json(obj, code) {

		obj = obj || {};
		code = code || obj.code || 200;

		try {

			var r = new ResponseSchema(obj);

			r.validate(function(err) {

				if(err)
					throw new Error(err);

				_res.json(r, code);
			})
		}

		catch(e) {

			var err = new ResponseSchema({

				result: lang.response.error || "error",
				code: 500,
				message: lang.response.unhandled_error || "Problem serving app response",
				data: {

					state: "trying to serve response",
					obj: obj,
					error: e
				}
			});

			_res.json(err, err.code);
		}

	}; exports.json = json;

	function view(name, data, code) {

		code = code || data.code || 200;

		_res.render(name, data, 
			function(err, html) {
				res.send(html);
		});
		
	}; exports.view = view;

	function redirect(url){
		res.redirect(url);
	}
	exports.redirect = redirect;

	function init() {
		return exports;
	}

	return init();
}

module.exports = Response;