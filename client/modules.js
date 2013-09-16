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

		}; exports.me = me;

		var login = function(data) {

			// prepare successful login callback
			broadcast.once("user/login/success", function(data) {

				if($("#destination").val())
					core.client.render($("#destination").val());
				else
					core.client.render("dashboard");
			});
	
			// prepare error login callback
			broadcast.once("user/login/error", function(data) {	
				alert("Error: "+ data.message || "unknown error.");
			});

			// call the api
			sandbox.api("user/login", {

				email: $("#email").val(),
				password: $("#password").val()

			}, function(response) {

				broadcast.publish("user/login/" + response.result, 
					response.data.user || response || {});
			});

		}; exports.login = login;

		var logout = function(data) {

			// prepare successful login callback
			broadcast.once("user/logout/success", function(data) {

				alert(data.message || "User successfully logged out.");
				core.client.render("/");

			});
	
			// prepare error login callback
			broadcast.once("user/logout/error", function(data) {	
				alert("Error: "+ data.message || "unknown error.");
			});

			// call the api
			sandbox.api("user/logout", function(response) {

				broadcast.publish("user/logout/" + response.result, response || {});

			});

		}; exports.logout = logout;

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
				alert("Error: "+ data.message || "unknown error.");
			});

			// call the api
			sandbox.api("user/signin", {

				name: $("#name").val(),
				email: $("#email").val(),
				password: $("#password").val()

			}, function(response) {

				broadcast.publish("user/signin/" + response.result, 
					response.data.user || {});
			});

		}; exports.signup = signup;

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
		var broadcast = sandbox.broadcast;
		
		//////////////////////////////
		// 		error actions		//
		//////////////////////////////
		broadcast.subscribe("app/ready", function(data) {

			window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
				sandbox.broadcast.publish("error", {
					description: errorMsg || "unknown",
					url: url || "unknown",
					line: lineNumber || "unknown"
				})
			}
		});

		broadcast.subscribe("error", function(data) {
			core.log.error("Error Module: Unhandled error thrown by application.");
			core.log.error(data || {description: "unknown"});

			alert("Oops, The app has crashed!");
		});

		var init = function() {

			core.log.info("starting error module...")

			var broadcast = sandbox.broadcast;

			return exports;

		}; exports.init = init;

		var destroy = function() {

			core.log.info("destroying error module...")
			
		}; exports.destroy = destroy;

		return exports;		
	}

})(window)