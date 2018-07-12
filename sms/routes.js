
// Initialize variables
const base = "/sms/";

// Initialize dependencies
const Async = require("async");

// Attach endpoints to server
module.exports = function (server) {

	// Receive: handles incoming SMS messages
	server.post(base+"receive", function (req, res, next) {

		console.log(req.body);

		// Initialize variables from request
		let message = req.body.Body;
		let sender = req.body.From;

		Async.waterfall([

			// Verify sender
			function (callback) {
				callback("shit this fuckin failed man fuck");
			},

		], function (err) {
			if (!err) res.sendStatus(200);
			next(err);
		})
	})
};