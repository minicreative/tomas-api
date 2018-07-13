
// Initialize constants
let NumberFilter = new RegExp("^[0-9.-]*$");

// Initialize dependencies
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Moment = require("moment");
const Geocoder = require("geocoder");

// Initialize model
let Location = Mongoose.model("Location", new Schema({
    lat: String,
    long: String,
    name: String,
    time: Number,
    note: String
}));

// Location Functions
module.exports = {

    // Add 
    add: function (detail, next) {

        // Get detail split into words
        let details = detail.split(" ");

        // Make sure format is correct
        if (!details[0] || !details[0].match(NumberFilter)) return next("Bad/missing latitude");
        if (!details[1] || !details[1].match(NumberFilter)) return next("Bad/missing longitude");

        // Set up object
        let latitude = details[0];
        let longitude = details[1];
        let note = null;
        if (details.length > 2) note = details.splice(2).join(" ");
        let locationDetails = {
            lat: latitude,
            long: longitude,
            time: Moment().format("X"),
        };
        if (note) locationDetails.note = note;

        // Geocode location
        Geocoder.reverseGeocode(latitude, longitude, function (err, data) {

            // Handle error
            if (err) locationDetails.name = latitude + " / " + longitude;

            // Handle success
            else {
                var place = data.results[0];
                var locationString = "";
                for (var i in place.address_components) {
                    if (place.address_components[i].types[0] == "locality") 
                        locationString += place.address_components[i].long_name;
                    if (place.address_components[i].types[0] == "administrative_area_level_1")
                        locationString += ", "+place.address_components[i].short_name;
                }
                locationDetails.name = locationString;
            }

            // Create new object
            let location = new Location(locationDetails);

            // Save object
            location.save(function (err) {
                next(err);
            });
        });
    },

    getLatest: function (next) {
        Location
            .findOne()
            .sort('-time')
            .exec(function(err, location) {
                next(err, location);
            });
    },

    getAll: function (next) {
        Location
            .find()
            .sort('-time')
            .exec(function(err, locations) {
                next(err, locations);
            });
    },
};