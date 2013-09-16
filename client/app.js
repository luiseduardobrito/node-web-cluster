(function(window){

	//////////////////////////////////////////////////////////
	//														//
	//				Application Configurations 				//
	//														//
	//////////////////////////////////////////////////////////

	var appConfig = {

		state: "production",

		development: {

			api: {

				host: "localhost",
				port: 3000
			},

			modules: ["user"],

			// show info logs
			log: true
		},

		testing: {

			api: {

				host: "localhost",
				port: 3000
			},

			modules: ["user"],

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

			// tag that specify the element content
			container: "data-container",
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

		var render = function(ctrl, data, cb) {

			if(!ctrl || !ctrl.length)
				throw new Error("No controller specified");

			else if(ctrl[0] == "#") {

				location.hash = ctrl
				return;
			}

			else if(ctrl == "/" || ctrl[0] == '/')
				var uri = ctrl;
			
			else 
				var uri = "/" + ctrl;

			data = data || null;
			cb = cb || function(){};

			var tag = "[" + clientConfig.tags.container + "='controllers']";
			var _ctrl = ctrl;

			$(tag).parent().load(uri +" "+ tag, data, function(data){

				bindings(tag);
				history.pushState('', uri || _ctrl, uri);
			})

		}; exports.render = render;

		var redirect = function(url) {

			document.location.replace(url);

		}; exports.redirect = redirect;

		var bindings = function(tag){

			$(tag + " a[data-module][data-method]").attr("href", "javascript:;");

			$(tag + " form[data-module][data-method]").on("submit", function(e){

				e.preventDefault();
				sandbox.broadcast.publish("module/call", {
					module: $(this).attr("data-module"),
					method: $(this).attr("data-method")
				});
			});

			$(tag + " a[data-module][data-method]").on("click", function(e){

				e.preventDefault();
				sandbox.broadcast.publish("module/call", {
					module: $(this).attr("data-module"),
					method: $(this).attr("data-method")
				});
			});

			$(tag + " a").on("click", function(e){

				e.preventDefault();

				if($(this).attr("data-module")
					&& $(this).attr("data-method")) {
					return false;
				}

				else
					core.client.render($(this).attr("href"));

				return false;
			})
		}

		var init = function(){

			exports.util = _;

			var tag = "[" + clientConfig.tags.container + "='controllers']";
			bindings(tag);

			$(window).on("hashchange", function(){
				sandbox.broadcast.publish("hash/" + location.hash.replace("#", ""), { 
					hash: location.hash 
				});
			});

			exports = $.extend($, exports);

			return exports;
		}

		return init();	
	}

	var Core = function(config) {

		var exports = {

			log: {},
			config: config, 

			client: new Client($, _)
		};

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

		var once = {
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

			once: function (type, fn) {

				type = type || 'any';

				if (typeof once[type] === "undefined") {
					once[type] = [];
				}

				once[type].push(fn);
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

				o = once[pubtype] || [];
				max = o.length;

				while(o.length) {
					
					var cb = o.pop();

					if (action === 'publish') {
						cb(arg);
						o.splice(i, 1);

					} 
				}
			}
		}; exports.broadcast = broadcast;

		var Api = function(config) {

			function call(uri, data, fn) {

				var connection_url = "http://" + config.api.host;
				connection_url += ":" + config.api.port + "/api/";

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

			if(location.hash) {
				core.client.render(location.hash);
			}

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

			sandbox.broadcast.subscribe("module/call", function(data) {

				if(!modules[data.module])
					throw new Error("Module not found: " + data.module)

				else if(!modules[data.module][data.method])
					throw new Error("Method '" + data.method+"' not found in '" + data.module + "' module")
				
				else {

					var m = modules[data.module][data.method];
					m(); 
				}
			});

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