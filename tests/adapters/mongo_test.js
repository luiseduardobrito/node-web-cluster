var mongo = require("../../api/adapters/mongo");
var log = require("winston");

var model = require("../../api/adapters/model");

exports.test_simpleCollection = function(test){

	var db = mongo.connect("test");

	db.save({

		test: "ok",
		timestamp: (new Date()).toISOString()

	}, function(){

		db.find(function(err, docs){

			log.info("Tests found in database: "+docs.length)
			test.ok(docs.length, "Should return some value.");
			test.done();

		});
	})
}

exports.test_saveModel = function(test) {

	var user = model.create("user", {

		name: "name",
		email: "email@provider.com",
		password: "abcd1234",
		access_token: "01234567890"

	});

	test.expect(1);

	model.save(user, function(res){

		test.ok(res, "Saved model result should be valid");
		test.done();
	})
}