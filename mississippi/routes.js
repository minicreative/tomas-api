
const base = "/mississisppi/";

// Attach smspost endpoints to server
module.exports = function (server) {

	// Receive: handles Twillio messages
	server.post(base+"receive", function (req, res, next) {
		Async.waterfall([


		], function (err) {
			if (err) next(err);
			else Secretary.respond(req, res);
		})
	})
};