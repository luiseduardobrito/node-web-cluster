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

#### Controllers 

Are defined in ```/api/controllers/``` as ```[name].js```. Example: ```/api/controllers/user.js```.

File structure:
```javascript
module.exports = {
	
	index: function(req, res) {
		res.json({
			test: "ok"
		})
	},

	get: function(req, res) {
		res.json({
			test: "ok"
		})
	},

	post: function(req, res) {
		res.json({
			test: "ok"
		})
	},

	put: function(req, res) {
		res.json({
			test: "ok"
		})
	},
}
```