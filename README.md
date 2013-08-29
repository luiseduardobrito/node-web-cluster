node-web-cluster
================

Node web cluster boilerplate.

### Getting Started

The project can be fully comtrolled using the NPM scripts defined in package.json.

* Start cluster
```sh
npm start
```

* Debug cluster
```sh
npm run-script debug
```

* Start single server
```sh
npm run-script start-server
```

* Debug single server
```sh
npm run-script debug-server
```

### API

The node-web-cluster is shipped with a MVC api ready to work, as simple as this:

/api/controllers/user.js

```javascript
	policy(req, res).check("authenticated", function() {

		var _user = req.cookies.user;

		if(_user.password)
			delete _user.password;

		res.json({

			result: "success",
			user: _user
		});

	})

```

#### Models

Are defined in ```/api/models/``` as ```[user]_model.js```. Example: ```/api/models/user_model.js```.

File structure:
```javascript
module.exports = {
	
	name: {

		required: true,
		type: "string"

	},

	email: {

		required: true,
		type: "email"

	},

	password: {

		required: true,
		type: "password"

	},

	access_token: {

		required: true,
		type: "string"

	},

	role: {

		required: true,
		type: "string",
		default: "user"
	},

	toJSON: function(_this){

		delete _this.password;
		return JSON.stringify(_this);
	}
}
```

Then, you can create a new object based on the model you defined above.

```javascript
var user = model.create("user", {

	name: "name",
	email: "email@provider.com",
	password: "abcd1234",
	access_token: "01234567890"

});

console.log(user.email); // prints: "email@provider.com"
```

#### Controllers 

Are defined in ```/api/controllers/``` as ```[name].js```. Example: ```/api/controllers/user.js```.

File structure: ```/api/controllers/test.js```

```javascript
module.exports = {
	
	// route: /test
	index: function(req, res) {
		res.json({
			test: "ok"
		})
	},
	
	// route: /test/get
	get: function(req, res) {
		res.json({
			test: "ok"
		})
	},

}
```
