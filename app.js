var Server = require("./scripts/server.js");

var config = require("./config/general");

var log = require("winston")
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var Cluster = function(cluster) {

	var exports = {
		master: cluster.isMaster
	};

	function start(cb) {

		cb = cb || function(){};

		if (cluster.isMaster) {

			for (var i = 0; i < numCPUs; i++) 
				cluster.fork();

			exports.cpus = numCPUs;

			cluster.on('exit', function(worker, code, signal) {
				console.log('worker ' + worker.process.pid + ' died');
			});

			cb();
		} 

		else
			var server = new Server();

	}; exports.start = start;

	function init() {

		var state = config[config.state];
		numCPUs = state.cluster? state.cluster.max || numCPUs : numCPUs;

		return exports;
	}

	return init();
}

var cluster = new Cluster(cluster);

cluster.start(function(){
	log.info("Starting cluster with " + cluster.cpus + " forks.\n")
});