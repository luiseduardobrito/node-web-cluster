module.exports = {

	"error": "error",

	/*
	 * GET methods
	 */
	"get": {
		"/": "home",

		"/user": "user",
		"/user/signin": "user/signin",
		"/user/login": "user/login",
		"/user/logout": "user/logout",

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