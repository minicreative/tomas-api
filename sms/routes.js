
// Initialize variables
const base = "/sms/";

// Initialize dependencies
const _ = require('lodash');
const Async = require("async");
const Config = require("./../config");
const Responder = require("./../tools/responder");
const SMSTools = require("./tools");
const Mississippi = require("./../mississippi/tools");

// Attach endpoints to server
module.exports = function (server) {

	// Receive: handles incoming SMS messages
	server.post(base+"receive", function (req, res, next) {

		// Check if request has body
		if (req.body === undefined) return next(Responder.twilioMessage("Missing parameters"));

		// Initialize variables from request
		let message = req.body.Body;
		let sender = req.body.From;

		// Check if sender exists
		if (sender === undefined || message === undefined) return next(Responder.twilioMessage("Missing parameters"));

		// Verify sender
		if (!_.includes(Config.authorizedNumbers, sender)) return next(Responder.twilioMessage("Not authorized"));

		// Verify command
		let command = message.split(" ")[0];
		if (!SMSTools.isValidCommand(command)) return next(Responder.twilioMessage("Invalid command"));

		// Get detail
		let detail = message.substr(message.indexOf(" ")+1);

		// Handle command
		Mississippi.handleCommand(command, detail, function (err) {
			if (err) next(Responder.twilioMessage(err));
			else Responder.twilioSuccess(res);
		});
	})
};