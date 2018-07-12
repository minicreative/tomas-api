
// Initialize dependencies
const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Async = require('async');
const Morgan = require('morgan');

// Initialize config
const config = require('./config');

// Initialize server
const server = Express();

// Startup functions ===========================================================

// Start Database: connects to database using config settings
function startDatabase (callback) {
	console.log('Connecting to database...');

	// Connect to database
	Mongoose.connect(config.DATABASE, {
        useNewUrlParser: true
    });

	// Callback upon success
	Mongoose.connection.once('open', function () {
		console.log('Connected to database!')
		callback();
	});

	// Listen for error
	Mongoose.connection.on('error', console.error.bind(console, 'Database error:'))
};

// Start Server: listens to ip:port using config settings
function startServer (callback) {
	console.log('Starting server...')

	// Setup express plugins
	server.use(BodyParser.json());
    server.use(Morgan('dev'));

	// Start listening to port, and then...
	server.listen(config.PORT, config.IP, function () {

        // Set headers
        server.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type,Authorization');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

		// Initialize interfaces
		require('./mississippi/routes')(server);

		// Callback upon success
		console.log('Server listening on '+config.IP+':'+config.PORT+'...');
		callback();
	})
};

// Run startup functions =======================================================

Async.waterfall([

	function (callback) {
		startDatabase(function () {
			callback();
		})
	},

	function (callback) {
		startServer(function () {
			callback();
		});
	},

], function (err) {

});