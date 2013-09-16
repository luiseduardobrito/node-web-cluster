module.exports = {

	"error": "error/not_found",

	/*
	 * GET methods
	 */
	"get": {

		// views
		"/": "home",
		"/login": "home/login",
		"/dashboard": "home/dashboard",

		// api
		"/api/user": "user",
		"/api/user/signin": "user/signin",
		"/api/user/login": "user/login",
		"/api/user/logout": "user/logout",

		"/test/get": "test/get"
	},

	/*
	 * POST methods
	 */
	"post": {
		"/test/post": "test/post"
	},

	/*
	 * PUT methods
	 */
	"put": {
		"/test/put": "test/put"
	}
};