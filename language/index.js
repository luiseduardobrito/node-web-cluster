var config = require("../config/general");

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