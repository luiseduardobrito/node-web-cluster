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
		type: "string"

	},

	access_token: {

		required: true,
		type: "string"

	}

	toJSON: function(_this){

		delete _this.password;
		return JSON.stringify(_this);
	}
}