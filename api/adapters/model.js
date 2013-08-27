var extend = require("extend");

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

var Model = function() {
	
	var exports = {};

	var type = new Type();

	var _model = {

		_id: {
			type: "string",
			default: "hashkey"
		},

		 _init: function(_this, init){
		
			init = init || function(){};

			for(var k in _this) {

				if(typeof _this[k] === typeof "str") {
					
				}
			}

		 	init();
			return _this;
		}

	};

	exports.toJSON = function() {

		return JSON.stringify(_this);

	};

	function create(input) {

		var m = _model;

		extend(m, input);
		exports._init(exports, exports.init || function(){});

		return input;

	}; exports.create = create;

	function hashkey(cb) {

		cb = cb || function(){};

		require('crypto').randomBytes(48, function(ex, buf) {
  			cb(buf.toString('hex'));
		});

		return null;
	}

	function save(obj) {
		// TODO
	}

	function init() {
		return exports;
	};

	return init();
}

exports.type = new Type();
exports.model = new Model();