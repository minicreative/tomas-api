
// Initialize dependencies
const Mongoose = require("mongoose");

module.exports = {
    clearDatabase: function (next) {
        Mongoose.connection.db.dropDatabase(function () {
            next();
        });
    },
};