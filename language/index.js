var config = require("../config/general");
var vsprintf = require("format").vsprintf;

var Language = function(default_lang) {

	var exports = {};

	var get = function(lang) {

		try {

			dict = require("./" + lang);
		}
		catch(e) {

			throw new Error("Invalid or unknown dictionary for '" + lang + "' language.");
		}

		return dict;

	}; exports.get = get;

	var val = function() {

		if(!arguments.length)
			throw new Error("No string id supplied");

		// args: id, var1, var2, var3
		var id = arguments[0];
		id = id.split('.') || id;

		var args = [];

		for(var k in arguments)
			args.push(arguments[k]);

		var str = getDefault()[id[0] || id + ""];

		for(var i = 1; i < id.length; i++)
			str = str[id[i]];

		if(!args.length)
			return str;
		else
			return vsprintf(str, args);

	}; 

	exports.val = val; 
	exports.value = val;

	var getDefault = function() {

		var lang = config.language || 
			config.lang || 
			config.i18n || 
			config.locale;

		try {

			if(!lang)
				throw new Error();

			return require("./" + lang);
		}

		catch(e) {

			throw new Error("The default language could not be found or is not specified.");
		}

	}; exports.getDefault = getDefault;

	var init = function() {
		return exports;
	}
	
	return init();
};

module.exports = new Language();