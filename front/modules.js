//////////////////////////////////////////////////////////
//														//
//	Custom Modules - App developer, edit here!			//
//														//
//////////////////////////////////////////////////////////

window.user_module = function(sandbox) {

	var exports = {};
	var events = {};

	//////////////////////////////
	// 		user actions		//
	//////////////////////////////
	events["user"] = function(data) {

		core.log.info("user/");

		sandbox.api("user", {}, function(response) {
			sandbox.broadcast.publish("user/" + response.result, 
				response.data.user || {});
		});
	};

	events["user/login"] = function(data) {
		sandbox.api("user/login", {

			email: data.email,
			password: data.password

		}, function(response) {
			sandbox.broadcast.publish("user/login/" + response.result, 
				response.data.user || {});
		});
	};

	events["user/signup"] = function(data) {
		sandbox.api("user/signin", {

			name: data.name,
			email: data.email,
			password: data.password

		}, function(response) {
			sandbox.broadcast.publish("user/signin/" + response.result, 
				response.data.user || {});
		});
	};


	//////////////////////////////
	// 		action responses	//
	//////////////////////////////
	events["user/login/success"] = function(data) {
		
		var user_info = sandbox.selector("#user-info");
		user_info.show();

		var user = sandbox.selector("#user");
		user.html(data.name);
	};

	events["user/login/error"] = function(data) {
		
		alert("error");
	};

	function init() {

		core.log.info("starting user module...")
		return exports;

	}; exports.init = init;

	function destroy() {

		core.log.info("destroying user module...")
		
	}; exports.destroy = destroy;

	function start() {

		var broadcast = sandbox.broadcast;

		for(var k in events)
			if(typeof events[k] == typeof function(){})
				broadcast.subscribe(k, events[k]);	

	}; exports.start = start();

	function stop() {

		var broadcast = sandbox.broadcast;

		for(var k in events)
			if(typeof events[k] == typeof function(){})
				broadcast.unsubscribe(events[k]);	

	}; exports.start = start();

	return exports;
}

//////////////////////////////////////////////////////////
//														//
//	Standard Modules - Framework default (don't edit!)	//
//														//
//////////////////////////////////////////////////////////