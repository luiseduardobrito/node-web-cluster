//////////////////////////////////////////////////////////
//														//
//	Custom Modules - App developer, edit here!			//
//														//
//////////////////////////////////////////////////////////

(function(window) {

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

			var broadcast = sandbox.broadcast;

			for(var k in events)
				if(typeof events[k] == typeof function(){})
					broadcast.subscribe(k, events[k]);	

			return exports;
			
		}; exports.init = init;

		function destroy() {

			core.log.info("destroying user module...")
			
		}; exports.destroy = destroy;

		return exports;
	}

	//////////////////////////////////////////////////////////
	//														//
	//	Standard Modules - Framework default (don't edit!)	//
	//														//
	//////////////////////////////////////////////////////////
	window.error_module = function(sandbox) {

		var exports = {};
		var events = {};
		
		//////////////////////////////
		// 		error actions		//
		//////////////////////////////
		events["app/ready"] = function(data) {

			window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
				core.log.error("Unhandled error catch by error module.");
				core.log.error(errorMsg ? errorMsg + " (:" + lineNumber  + ")" : {description: "unknown"});

				alert("Oops, The app has crashed!");
				return false;
			}
		};

		events["error"] = function(data) {
			core.log.error("Unhandled error catch by error module.");
			core.log.error(data || {description: "unknown"});

			alert("Oops, The app has crashed!");
		}

		function init() {

			core.log.info("starting error module...")

			var broadcast = sandbox.broadcast;

			for(var k in events)
				if(typeof events[k] == typeof function(){})
					broadcast.subscribe(k, events[k]);	

			return exports;

		}; exports.init = init;

		function destroy() {

			core.log.info("destroying error module...")
			
		}; exports.destroy = destroy;

		return exports;		
	}

})(window)