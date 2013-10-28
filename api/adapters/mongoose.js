//////////////////////////////////////////////////////////
//														//
//			Model Adapter - Framework default			//
//														//
//////////////////////////////////////////////////////////

// model dependencies
var extend = require("extend");
var crypto = require("crypto");
var log = require("winston");

var config = require("../../config/general");
config = config[config.state].db;

var lang = require("../../language").getDefault();
var mongoose = require('mongoose');

// default password encryption algorithm
var DEFAULT_ENCRYPTION = "sha256";
var DEFAULT_PORT = 27017;

//////////////////////////////////////////////////////////
//														//
//			Model Class - Framework default				//
//														//
//////////////////////////////////////////////////////////

var MongooseAdapter = function() {

	if ( arguments.callee._singletonInstance )
    	return arguments.callee._singletonInstance;
    
	arguments.callee._singletonInstance = this;
	
	var _this = this;
	var _public = _this.exports = {};

	_public.schema = mongoose.Schema;
	_public.validate = require('mongoose-validator').validate;;

	_public.model = function(name, input) {

		var schema = require("../models/" + name + "_model");
		return mongoose.model(name, schema);
	}

	_this.init = function() {

		var str = config.protocol;
		str = str + config.user

		if(config.password && config.password.length > 0) {
			str = str + ":" + config.password;
		}

		str = str + "@" + config.host + ":" + (config.port || DEFAULT_PORT);
		str = str + "/" + (config.db || "");

		mongoose.connect(str)

		return _this.exports;
	}

	return _this.init();
}

module.exports = new MongooseAdapter();