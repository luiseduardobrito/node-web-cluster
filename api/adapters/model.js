var extend = require("extend");
var crypto = require("crypto");

var Type = function() {

	var exports = {};

	var handlers = {};

	function int(input) {

		if(input === null) {
			throw new Error("The input should not be null.");
		}

		else if(typeof input !== typeof 0) {
			throw new Error("The input should be a number");
		}

		else if(input !== parseInt(input)) {
			throw new Error("The input should be an integer");
		}

		return true;
	}; 

	handlers.int = {
		tags: ["int", "integer"],
		check: int
	}

	function string(input) {

		if(input === null) {
			throw new Error("The input should not be null.");
		}

		else if(typeof input !== typeof "str") {
			throw new Error("The input should be a string");
		}

		return true;
	}

	handlers.string = {
		tags: ["str", "string"],
		check: string
	}

	function email(input) {

		if(typeof input !== typeof "str") {
			throw new Error("The input should be a string");
		}

		else {

			if(input.indexOf('@') == -1 || input.indexOf('.') == -1){
				throw new Error("The input should be a valid email");
			}

			try {

				var domain = input.split('@')[1];

				if(domain.length < 3)
					throw new Error();
			}
			catch(e) {
				throw new Error("The domain should be valid.");
			}
		}

		return true;
	};

	handlers.email = {
		tags: ["email"],
		check: email
	}

	function object(input) {

		if(input === null) {
			throw new Error("The input should not be null.");
		}

		if(typeof input !== typeof {}) {
			throw new Error("The input should be an object.");
		}

		if(toString.call(input) != toString.call({})) {
			throw new Error("The input should be an object.");
		}

		return true;
	};

	handlers.object = {
		tags: ["object", "obj"],
		check: object
	}

	function array(input) {

		if(input === null) {
			throw new Error("The input should not be null.");
		}

		if(typeof input !== typeof []) {
			throw new Error("The input should be an array.");
		}

		if(toString.call(input) != toString.call([])){
			throw new Error("The input should be an array.");
		}

		return true;
	};

	handlers.array = {
		tags: ["array", "arr"],
		check: array
	}

	function get(str) {
		for(var k in handlers)
			for(var i = 0; i < handlers[k].tags.length; i++)
				if(handlers[k].tags[i] == str)
					return handlers[k]

		return false;

	}; exports.get = get;

	function init(){
		exports.handlers = handlers;
		return exports;
	}

	return init();
}

var Model = function(type) {
	
	var exports = {};

	var type = new Type();

	var _model = {

		_id: {
			type: "string",
			default: "hashkey",
			required: true
		},

		toJSON: function() {
			return JSON.stringify(_this);
		}
	};

	function sanitize(model) {

		for(var k in model) {

			if(toString.call(model[k]) == toString("str")) {

				model[k] = {
					type: model[k],
					required: false
				};
			}
		}

		return model;
	}

	function generate_default(d) {

		if(d == "hashkey") {

			try {

				var buf = crypto.randomBytes(16);
				return buf.toString('base64');

			} catch (e) {
				throw new Error("Problem generating random hash.");
			}
		}

		else if(d == "null" || d == null)
			return null

		else
			return d;
	} 

	function initialize(obj, model) {

		model = sanitize(model);

		// validate
		for(var k in model) {

			if(toString.call(model[k]) == toString.call(function(){})) {
				obj[k] = model[k]
			}

			else if(model[k].required) {

				try {
					type.get(model[k].type).check(obj[k]);
				}
				catch(e) {

					if(model[k].default)
						obj[k] = generate_default(model[k].default)
					else
						throw new Error("Error required parsing field '"+k+"': "+e);
				}
			}
			else {
				try {
					type.get(model[k].type).check(obj[k]);
				}
				catch(e) {
					obj[k] = null
				}
			}
		}

		return obj;
	};

	function create(name, input) {

		var m = require("../models/" + name + "_model");

		extend(m, _model);
		input = initialize(input, m);

		return input;

	}; exports.create = create;

	function save(obj) {
		// TODO
	}

	function init() {
		return exports;
	};

	return init();
}

exports.type = new Type();
exports.model = new Model(exports.type);