
// Initialize variables
const base = "/sms/";

// Initialize dependencies
const _ = require('lodash');
const Async = require("async");
const Config = require("./../config");
const Responder = require("./../tools/responder");
const SMSTools = require("./smstools");

// Attach endpoints to server
module.exports = function (server) {

	// Receive: handles incoming SMS messages
	server.post(base+"receive", function (req, res, next) {

		// Check if request has body
		if (req.body === undefined) return next(Responder.twilioError("Missing parameters"));

		// Initialize variables from request
		let message = req.body.Body;
		let sender = req.body.From;

		// Check if sender exists
		if (sender === undefined || message === undefined) return next(Responder.twilioError("Missing parameters"));

		// Verify sender
		if (!_.includes(Config.authorizedNumbers, sender)) return next(Responder.twilioError("Not authorized"));

		// Verify command
		let command = message.split(" ")[0];
		if (!SMSTools.isValidCommand(command)) return next(Responder.twilioError("Invalid command"));

		// Async
		Async.waterfall([

			function (callback) {
				callback();
			},

		], function (err) {
			if (err) next(err);
			else Responder.twilioSuccess(res);
		})
	})
};