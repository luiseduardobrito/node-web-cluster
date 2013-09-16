//////////////////////////////////////////////////////////
//														//
//	Custom Modules - App developer, edit here!			//
//														//
//////////////////////////////////////////////////////////

(function(window) {

	window.user_module = function(sandbox) {

		var exports = {};
		var broadcast = sandbox.broadcast;

		//////////////////////////////
		// 		user actions		//
		//////////////////////////////
		var me = function(data) {

			// call the api
			sandbox.api("user", {}, function(response) {
				broadcast.publish("user/me/" + response.result, 
					response.data.user || {});
			});

		};

		var login = function(data) {

			// prepare successful login callback
			broadcast.subscribe("user/login/success", function(data) {
			
				var user_info = sandbox.client("#user-info");
				user_info.show();

				var user = sandbox.client("#user");
				user.html(data.name);
			});
	
			// prepare error login callback
			broadcast.subscribe("user/login/error", function(data) {	
				alert("error");
			});

			// call the api
			sandbox.api("user/login", {

				email: data.email,
				password: data.password

			}, function(response) {

				broadcast.publish("user/login/" + response.result, 
					response.data.user || {});
			});
		};

		var signup = function(data) {

			// prepare successful login callback
			broadcast.subscribe("user/signup/success", function(data) {
			
				var user_info = sandbox.client("#user-info");
				user_info.show();

				var user = sandbox.client("#user");
				user.html(data.name);
			});
	
			// prepare error login callback
			broadcast.subscribe("user/signup/error", function(data) {	
				alert("error");
			});

			// call the api
			sandbox.api("user/signin", {

				name: data.name,
				email: data.email,
				password: data.password

			}, function(response) {

				broadcast.publish("user/signin/" + response.result, 
					response.data.user || {});
			});

		};

		function init() {

			core.log.info("starting user module...")
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
				sandbox.broadcast.publish("error", {
					description: errorMsg || "unknown",
					url: url || "unknown",
					line: lineNumber || "unknown"
				})
			}
		};

		events["error"] = function(data) {
			core.log.error("Error Module: Unhandled error thrown by application.");
			core.log.error(data || {description: "unknown"});

			alert("Oops, The app has crashed!");
		}

		var init = function() {

			core.log.info("starting error module...")

			var broadcast = sandbox.broadcast;

			for(var k in events)
				if(typeof events[k] == typeof function(){})
					broadcast.subscribe(k, events[k]);	

			return exports;

		}; exports.init = init;

		var destroy = function() {

			core.log.info("destroying error module...")
			
		}; exports.destroy = destroy;

		return exports;		
	}

})(window)