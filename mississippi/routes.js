
// Initialize variables
const base = "/mississippi/";

// Initialize dependencies
const Location = require("./location");
const Book = require("./book");
const Responder = require("./../tools/responder");
const Moment = require("moment");

// Attach endpoints to server
module.exports = function (server) {

    // Latest Location: gets the latest location to display at the top of the page
	server.get(base+"latestLocation", function (req, res, next) {
        Location.getLatest(function(err, location) {
            if (err) next(Responder.serverError(err));
            else {
                res.body = {
                    location: location
                };
                Responder.success(res);
            }
        });
    });
    
    // All Locations: gets all locations to create map
	server.get(base+"allLocations", function (req, res, next) {
        Location.getAll(function(err, locations) {
            if (err) next(Responder.serverError(err));
            else {
                res.body = {
                    locations: locations
                };
                Responder.success(res);
            }
        });
    });

    // Book: latest book
    server.get(base+"latestBook", function (req, res, next) {
        Book.getLatest(function(err, book) {
            if (err) next(Responder.serverError(err));
            else {
                res.body = {
                    book: book
                };
                Responder.success(res);
            }
        });
    });

};