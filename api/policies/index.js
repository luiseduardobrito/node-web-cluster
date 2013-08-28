module.exports = function(req, res) {

	var _req = req;
	var _res = res;

	var exports = {};

	function check(name, cb) {

		cb = cb || function(){};

		var p = require("./" + name);

		p(_req, _res, function(){

			cb();
		})

	}; exports.check = check;

	function init() {
		return exports;
	}

	return init();
}