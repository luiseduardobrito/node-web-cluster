var model = require("../../api/adapters/model");

exports.test_simpleInteger = function(test) {

	var type = model.type;

	var integer = type.get("integer");

	test.ok(integer.check(0), "Should return true, integer is valid.");

	test.throws(function(){
		integer.check("str")
	}, Error, "Should throw exception, integer is not valid.");

	test.done();
}

exports.test_simpleString = function(test) {

	var type = model.type;

	var string = type.get("string");

	test.ok(string.check("str"), "Should return true, string is valid.");

	test.throws(function(){
		string.check(0)
	}, Error, "Should throw exception, string is not valid.");

	test.done();
}

exports.test_simpleEmail = function(test) {

	var type = model.type;

	var email = type.get("email");

	test.ok(email.check("name@domain.com"), "Should return true, email is valid.");

	test.throws(function(){
		email.check(0)
	}, Error, "Should throw exception, email is an integer.");

	test.throws(function(){
		email.check("str")
	}, Error, "Should throw exception, email is not valid.");

	test.throws(function(){
		email.check("name.domain.com")
	}, Error, "Should throw exception, email is not valid.");

	test.done();
}

exports.test_simpleObject = function(test) {

	var type = model.type;
	var obj = {test: "object", recursive: {}};

	var object = type.get("object");

	test.ok(object.check(obj), "Should return true, object is valid.");

	test.throws(function(){
		object.check("")
	}, Error, "Should throw exception, object is not valid.");

	test.throws(function(){
		object.check([])
	}, Error, "Should throw exception, object is not valid.");

	test.done();
}

exports.test_simpleArray = function(test) {

	var type = model.type;
	var arr = ["elem1", "elem2", ["elem3", ["elem4"]]];

	var array = type.get("array");

	test.ok(array.check(arr), "Should return true, array is valid.");

	test.throws(function(){
		array.check("")
	}, Error, "Should throw exception, array is not valid.");

	test.throws(function(){
		array.check({test: "ok"})
	}, Error, "Should throw exception, array is not valid.");

	test.done();
}

exports.testModel = function(test) {
	test.done();
}