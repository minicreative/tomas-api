
// Initialize variables
const base = "/sms/";

// Initialize dependencies
const Async = require("async");

// Attach endpoints to server
module.exports = function (server) {

	// Receive: handles incoming SMS messages
	server.post(base+"receive", function (req, res, next) {
		Async.waterfall([
			function (callback) {
				console.log(req.body.Body);
				callback();
			},
		], function (err) {
			next(err);
		})
	})
};