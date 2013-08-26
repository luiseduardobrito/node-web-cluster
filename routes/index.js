
/*
 * GET home page.
 */

var api = require("./api");

var Router = function(api) {

	var exports = {};

	function method(path) {

		var arr = path.split("/");

		if(arr[0] === "")
			arr.shift();

		if(arr[arr.length - 1] === "")
			arr.pop();

		var ctrl = require("../api/controllers" + arr.shift());
		var method = ctrl[arr.shift()];

		return method;
	}

	function bind(app, cb) {

		cb = cb || function(){};

		for(var k in api.get)
			app.get(k, method(api[k]));

		cb(app);

	}; exports.bind = bind;

	function init() {
		return exports;
	}

	return init();
}

module.exports = new Router(api)