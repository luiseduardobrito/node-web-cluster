var extend = require("extend");
var check = require('validator').check,
var sanitize = require('validator').sanitize;

//Validate
check('abc').isInt();                               //Throws 'Invalid integer'
check('abc', 'Please enter a number').isInt();      //Throws 'Please enter a number'
check('abcdefghijklmnopzrtsuvqxyz').is(/^[a-z]+$/);

var Model = new function() {
	
	var exports = {};

	var _model = {

		_id {
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

	exports.toJSON: function() {

		return JSON.stringify(_this);

	}; exports.toJSON = toJSON;

	function create(input) {

		var m = _model;

		extend(m, input);
		exports._init(exports, exports.init || function(){});

		return input;

	}; exports.create = create;

	function hashkey(cb) {

		cb = cb || function();

		require('crypto').randomBytes(48, function(ex, buf) {
  			cb(buf.toString('hex'));
		});

		return null;
	}

	function email(cb) {
		cb = cb || function();

		check('test@email.com').len(6, 64).isEmail();
		cb(true);
	}

	function save(obj) {
		// TODO
	}

	function init() {
		return exports;
	};

	return init();
}