module.exports = {
	
	state: "development",

	development: {

		port: 3000,

		cluster: {

			max: 1
		}
	},

	test: {

		port: 3000,

		cluster: {
		
			max: 3
		}
	},

	production: {

		port: 3000
	},
}