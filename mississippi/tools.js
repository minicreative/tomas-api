
// Initialize dependencies
const Location = require("./location");
const Book = require("./book");

// Mississippi
module.exports = {

    handleCommand: function (command, detail, next) {
        if (command == "Location") Location.add(detail, next);
        else if (command == "Book") Book.add(detail, next);
        else next("Wrong command");
    }

};