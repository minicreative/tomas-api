
// Initialize static variables
const validCommands = [
    "Location",
    "Book",
    "Feeling"
];

// Initialize dependencies
const _ = require("lodash");

// SMS Tools
module.exports = {

    isValidCommand: function (command) {
        if (_.includes(validCommands, command)) return true;
        return false;
    }

};