
// Include dependencies
const TwilioResponser = require('twilio').twiml.MessagingResponse;

// Responder: custom Express responses
module.exports = {

    // Success: basic success response
    success: function (res) {
        if (!res.body) res.body = {};
        res.body.message = "Success";
        res.status(200).json(res.body);
    },

    twilioSuccess: function (res) {
        let responder = new TwilioResponser();
        let message = responder.message("OK!");
        res.writeHead(200, { 'Content-Type': 'text/xml' });
  		res.end(message.toString());
    },

    twilioMessage: function (message) {
        let responder = new TwilioResponser();
        let twilioMessage = responder.message(message);
        return {
            twilioError: true,
            message: twilioMessage.toString(),
        };
    },

    twilioError: function (message) {
        return this.twilioMessage("Server error");
    },

    userError: function (message) {
        return {
            handledError: true,
            status: 400,
            message: message
        };
    },

    serverError: function () {
        return {
            handledError: true,
            status: 500,
            message: message
        };
    }
};