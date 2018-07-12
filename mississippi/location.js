
// Initialize constants
let NumberFilter = new RegExp("^[0-9.-]*$");

// Initialize dependencies
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Moment = require("moment");

// Initialize model
let Location = Mongoose.model("Location", new Schema({
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
        if (!details[0] || !details[0].match(NumberFilter)) next("Bad/missing longitude");
        if (!details[1] || !details[1].match(NumberFilter)) next("Bad/missing longitude");

        // Get variables
        let latitute = details[0];
        let longitude = details[1];
        let note = null;
        if (details.length > 2) note = details.splice(0,2).join(" ");
        let locationDetails = {
            lat: latitude,
            long: longitude,
            time: Moment().format("X"),
        };
        if (note) locationDetails.note = note;

        // Create new object
        let location = new Location(locationDetails);

        // Save object
        location.save(function (err) {
            next(err);
        });
    },
};