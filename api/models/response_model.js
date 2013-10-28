//////////////////////////////////////////
//										//
//	Response Model - Required model 	//
//	Default JSON schema for responses	//
//										//
//////////////////////////////////////////

var mongoose = require('../adapters/mongoose');
var Schema = mongoose.schema;
var check = mongoose.validate;

var ResponseSchema = new Schema({

	code: {

		type: Number, 
		required: true, 
		default: 200,
	},

	result: {

		type: String, 
		required: true, 
		default: "success",

		validate: [

			function(val, next) {
				if(val != "success" && val != "error")
					throw new Error("Result should be 'success' or 'error'");
				next()
			}
		]
	},

	message: {

		type: String, 
		required: false
	},

	data: {

		type: Schema.Types.Mixed, 
		required: false
	}
});

ResponseSchema.methods.toJSON = function() {

	obj = this.toObject()
	delete obj._id
	return obj
}

module.exports = ResponseSchema;