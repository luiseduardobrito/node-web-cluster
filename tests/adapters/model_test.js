exports.test_simpleModel = function(test) {

	var mongoose = require("../../api/adapters/mongoose");
	var UserTest = mongoose.model("user");

	var user = new UserTest({
		name: "luis",
		email: "luiseduardo14@gmail.com",

		password: "123456"
	})

	test.expect(1);

	user.save(function(err) {

		test.ifError(err);
		test.done();
	})
}