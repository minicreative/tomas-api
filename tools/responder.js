
// Responder: custom Express responses
module.exports = {

    // Success: basic success response
    success: function (res) {
        if (!res.body) res.body = {};
        res.body.message = "Success";
        res.status(200).json(res.body);
    },

    twilioSuccess: function (res) {
        res.sendStatus(200);
    },

    twilioError: function (message) {
        return {
            twilioError: true,
            message: message.substr(0, 150),
        };
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