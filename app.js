var Server = require("./scripts/server.js");

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

	// Fork workers.
	for (var i = 0; i < numCPUs; i++) 
		cluster.fork();

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {

	// Workers can share any TCP connection
	// In this case its a HTTP server
	var server = new Server();
}