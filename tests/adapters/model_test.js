var model = require("../../api/adapters/model");

exports.testSimpleInt = function(test) {
	debugger;

	var type = model.type;

	var integer = type.get("integer");

	test.ok(integer.check(0), "Should return true, integer is valid.");

	test.throws(function(){
		integer.check("str")
	}, Error, "Should throw exception, integer is not valid.");

	test.done();
}

exports.testSimpleString = function(test) {
	debugger;

	var type = model.type;

	var string = type.get("string");

	test.ok(string.check("str"), "Should return true, string is valid.");

	test.throws(function(){
		string.check(0)
	}, Error, "Should throw exception, string is not valid.");

	test.done();
}

exports.testSimpleEmail = function(test) {
	debugger;

	var type = model.type;

	var email = type.get("email");

	test.ok(email.check("name@domain.com"), "Should return true, email is valid.");

	test.throws(function(){
		email.check(0)
	}, Error, "Should throw exception, email is not valid.");

	test.throws(function(){
		email.check("str")
	}, Error, "Should throw exception, email is not valid.");

	test.throws(function(){
		email.check("name.domain.com")
	}, Error, "Should throw exception, email is not valid.");

	test.done();
}