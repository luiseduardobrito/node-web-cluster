var BackendConfig = {

	domain: "localhost",
	port: "3000"
}

var Sandbox = function() {

	var exports = {};
	var modules = {};

	function register(name, module) {
		modules[name] = module;
		module.init = module.init || function(){};
	};

	function start(name) {

		if(!module[name])
			return false;

		module[name].init(sandbox)
		return true;
	}

	function stop(name) {
		
		if(!module[name])
			return false;

		module[name].stop(sandbox)
		return true;
	}
	
};