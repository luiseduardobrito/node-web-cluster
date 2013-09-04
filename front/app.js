var appConfig = {

	state: "development",

	development: {

		api: {

			host: "localhost",
			port: 3000
		},

		modules: ["user"]
	},

	testing: {

		api: {

			host: "localhost",
			port: 3000
		},

		modules: ["user", "tracking"]
	},

	production: {

		api: {

			host: "localhost",
			port: 3000
		},

		modules: ["user", "tracking"]
	}
}

var Core = function(config) {

	var exports = {log: {}, config: config};

	// wrap logger
	function info(msg) {

		if(toString.call(msg) == toString.call("str"))
			console.log("info: " + msg);
		else
			console.log(msg);
	};
	exports.log.info = info;

	// wrap logger
	function error(msg) {
		console.error(msg);
	};
	exports.log.error = error;

	function init() {

		// run unit test
		info("core initialized successfully...")

		return exports;
	}	

	return init();
}

var Sandbox = function(core) {

	var exports = {
		modules: core.config.modules,
		selector: $
	};

	var subscribers = {
			any: [] // event type: subscribers
		};

	var broadcast = {

		subscribe: function (type, fn) {

			type = type || 'any';

			if (typeof subscribers[type] === "undefined") {
				subscribers[type] = [];
			}

			subscribers[type].push(fn);
		},

		unsubscribe: function (fn, type) {
			this.visitSubscribers('unsubscribe', fn, type);
		},

		publish: function (type, publication) {
			this.visitSubscribers('publish', publication, type);
		},

		visitSubscribers: function (action, arg, type) {
			var pubtype = type || 'any';
			s = subscribers[pubtype] || [];
			max = s.length;

			for (var i = 0; i < max; i += 1) {

				if (action === 'publish') {
					s[i](arg);
				} else {
					if (s[i] === arg) {
						s.splice(i, 1);
					}
				}
			}
		}
	}; exports.broadcast = broadcast;

	var Api = function(config) {

		function call(uri, data, fn) {

			var connection_url = "http://" + config.api.host;
			connection_url += ":" + config.api.port + "/";

			fn = fn || function(){};
			data = data || {};

			$.get(connection_url + uri, data, function(data) {
				fn(toString.call(data) == toString.call("str") ?
					JSON.parse(data) : data)
			});
		};

		function init() {
			return call;
		}

		return init();

	}; exports.api = new Api(core.config);

	function init() {
		core.log.info("sandbox initialized successfully...")
		return exports;
	}	

	return init();	
};


var Application = function(sandbox) {

	var exports = {};
	var modules = {};
	var queue = {};

	function start(name) {

		modules[name] = modules[name].init(sandbox);

	}; exports.start = start;

	function startAll() {

		for(var k in modules)
			start(k);

		core.log.info("app started successfully")

	}; exports.startAll = startAll;

	function stop(name) {

		modules[name] = modules[name] = {};
		modules[k].destroy = modules[k].destroy || function(){};
		modules[k].destroy();
		modules[k] = null;
		return true;

	}; exports.stop = stop;

	function stopAll() {

		for(var k in modules) 
			stop(k)

		core.log.info("app stopped successfully");
		return true;

	}; exports.stopAll = stopAll;

	function register(name) {

		if(window[name + "_module"]) {

			var m = window[name + "_module"];
			modules[name] = m(sandbox);
			return true;
		}

		else
			return false;
	};

	function init() {

		for(var i = 0; i < sandbox.modules.length; i++)
			if(!register(sandbox.modules[i]))
				core.log.error("Module not found: " + sandbox.modules[i])


		core.log.info("app initializing...")
		return exports;
	}	

	return init();	
}

var config = appConfig[appConfig.state];
var core = new Core(config);

var sandbox = new Sandbox(core);