
/**
 * Module dependencies.
 */

var log = require("winston");
console.log = log.info;

var express = require('express');
var routes = require('../routes');
var http = require('http');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');

var Server = function(cb) {

	cb = cb || function(){};
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);

	app.set('view engine', 'ejs');
	app.use(expressLayouts)

	app.use(express.favicon());
	
	// express own logger
	// app.use(express.logger('dev'));

	// enable web server logging; pipe those log messages through winston
	var winstonStream = {
    	write: function(message, encoding){
        	log.info(message);
    	}
	};
	app.use(express.logger({stream:winstonStream}));

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '../public')));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	// prepare routes
	routes.bind(app, function(app) {

		http.createServer(app).listen(app.get('port'), function(){

			console.log('Worker listening on port ' + app.get('port'));
			cb(app);

		});
	});
}

module.exports = new Server();