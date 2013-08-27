var log = console.log;

var appConfig = {
	
	state: "development"
}

var Application = function(appConfig, sandbox) {
	
	var exports = {};

	function start() {
		log("Starting app...");
		sandbox.startAll();
	}

	function stop() {
		log("Stop app...");
		sandbox.stopAll();
	}

	function register(name, module) {
		log("Registerinng module '"+name+"'...");
		sandbox.register(name, module);
	}

	function init() {

		for(var i = 0; i < appConfig..modules; i++) {
			sandbox.register(appConfig.modules[i]);
		}

		return exports;
	};
}

var app = new Application(appConfig, sandbox);
app.start();