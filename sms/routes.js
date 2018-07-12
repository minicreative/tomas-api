
// Initialize variables
const base = "/sms/";

// Initialize dependencies
const Async = require("async");
const Responder = require("./../tools/responder");

// Attach endpoints to server
module.exports = function (server) {

	// Receive: handles incoming SMS messages
	server.post(base+"receive", function (req, res, next) {
		Async.waterfall([
			function (callback) {
				console.log(req.body);
				callback();
			},
		], function (err) {
			if (err) {
				res.status(500);
				res.json({
					message: "fail"
				});
			} else {
				res.status(200);
				res.json({
					message: "dope!"
				})
			}
		})
	})
};