
// Initialize constants
let NumberFilter = new RegExp("^[0-9.-]*$");

// Initialize dependencies
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Moment = require("moment");

// Initialize model
let Location = mongoose.model("Location", new Schema({
    lat: String,
    long: String,
    time: Number,
}));

// Location Functions
module.exports = {

    // Add 
    add: function (detail, next) {

        // Get detail split into words
        let details = detail.split(" ");

        // Make sure format is correct
        for (let i in details) if (!details[i].match(NumberFilter)) next("Bad formatting");

        // Create new object
        let location = new Location({
            lat: details[0],
            long: details[1],
            time: moment().format("X"),
        });

        // Save object
        location.save(function (err) {
            next(err);
        });
    },
};