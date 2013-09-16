(function(window){

	//////////////////////////////////////////////////////////
	//														//
	//				Application Controllers 				//
	//														//
	//////////////////////////////////////////////////////////

	var controllers = {

		home: function(client) {

			// define view data
			var data = {

				title: "note-web-cluster",
				version: "v0.0.2"
			};

			// render template for home
			client.render("home", data);
		},

		help: function(client) {

			// define view data
			var data = {

				title: "help",
				message: ">> help message here <<"
			};

			// render template for home
			client.render("help", data);
		},

		// controller for 404 error
		_error: function(client) {

			// define view data
			var data = {

				title: "error",
				code: "404"
			};

			// render template for home
			client.render("error", data);
		}
	};

	//////////////////////////////////////////////////////////
	//														//
	//				Application Configurations 				//
	//														//
	//////////////////////////////////////////////////////////

	var appConfig = {

		state: "development",

		development: {

			api: {

				host: "localhost",
				port: 3000
			},

			modules: ["user", "error"],

			// show info logs
			log: true
		},

		testing: {

			api: {

				host: "localhost",
				port: 3000
			},

			modules: ["user", "error"],

			// show info logs
			log: true
		},

		production: {

			api: {

				host: "localhost",
				port: 3000
			},

			modules: ["user", "error"]
		}
	}

	var clientConfig = {

		tags: {
			controllers: "data-controller"
		}
	}

	//////////////////////////////////////////////////////////
	//														//
	//			Framework Core - try not to edit...			//
	//														//
	//////////////////////////////////////////////////////////

	var Client = function($, _) {

		if(!clientConfig) {
			throw new Error("No client configuration available...");
		}

		var exports = {};

		var render = function(ctrl, data) {

			if(!ctrl)
				throw new Error("No controller specified");

			// TODO: increase native code
			// we need to reduce external lib using
			// such as jQuery or underscore
			data = data || {};

			var tag = clientConfig.tags.controllers;
			var _t = $("["+tag+"='"+ctrl+"']").html() || "";

			if(!_t)
				throw new Error("No template available for '"+ctrl+"' controller.");

			var compiled = _.template(_t);
			return compiled(data);

		}; exports.render = render;

		var init = function(){

			// merge underscore lib into client
			exports.util = _;

			// merge jquery lib into client
			exports = $.extend($, exports);

			return exports;
		}

		return init();	
	}

	var Router = function(client) {

		var exports = {};
		var currentCtrl = null;

		var run = function() {

			if(!currentCtrl)
				throw new Error("No controller loaded.");

			// start controller
			// create a new undescore wrapper
			currentCtrl(new Client(_));

		}; exports.run = run;

		var get = function(ctrl) {

			if(!controllers[ctrl]) {
				throw new Error("Controller not found: " + ctrl.toString());
			}

			else {

				currentCtrl = controllers[ctrl];
				run();
			}

		}; exports.get = get;

		var init = function(){

			// bind hash changes
			client(window).on('hashchange', function() {
				location.hash = location.hash.replace("#", "");
				get(location.hash)

			});

			return exports;
		}

		return init();
	}; 

	var Core = function(config) {

		var exports = {log: {}, config: config, client: null};

		// wrap logger
		function info(msg) {

			if(!config.log) 
				return;

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

			// start client
			exports.client = new Client($, _);

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

			unsubscribe: function (type, fn) {
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


	window.Application = function(sandbox) {

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
				modules[name] = new m(sandbox);
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
			sandbox.broadcast.publish("app/ready", {});
			return exports;
		}	

		return init();	
	}

	var config = appConfig[appConfig.state];
	window.core = new Core(config);

	window.sandbox = new Sandbox(core);

})(window)