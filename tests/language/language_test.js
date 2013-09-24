var language = require("../../language");

exports.test_simpleDictionary = function(test) {

	test.ok(language.get("en-US"));
	test.done();
}

exports.test_simpleError = function(test) {
	
	var lang = language.get("en-US");
	test.ok(lang.error.unknown);
	test.done();	
}