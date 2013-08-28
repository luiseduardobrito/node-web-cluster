module.exports = {
	
	name: {

		required: true,
		type: "string"

	},

	email: {

		required: true,
		type: "email"

	},

	password: {

		required: true,
		type: "password"

	},

	access_token: {

		required: true,
		type: "string"

	},

	role: {

		required: true,
		type: "string",
		default: "user"
	},

	toJSON: function(_this){

		delete _this.password;
		return JSON.stringify(_this);
	}
}