
// Initialize variables
const base = "/mississippi/";

// Initialize dependencies
const Config = require("./../config");
const Location = require("./location");
const Book = require("./book");
const Responder = require("./../tools/responder");
const Moment = require("moment");
const Database = require("./../tools/database");

// Attach endpoints to server
module.exports = function (server) {

    // Latest Location: gets the latest location
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
    
    // All Locations: gets array of all locations 
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

    // Get Latest: gets latest book
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

    // All Books: gets array of all books
    server.get(base+"allBooks", function (req, res, next) {
        Book.getAll(function(err, books) {
            if (err) next(Responder.serverError(err));
            else {
                res.body = {
                    books: books
                };
                Responder.success(res);
            }
        });
    });

    // Clear Database
    server.get(base+"clearDatabase", function (req, res, next) {

        // Initialize and check password
        var password = req.query.password;
        if (!password || password != Config.DB_PASSWORD) 
            return next(Responder.userError("Invalid password"));

        // Clear database
        Database.clearDatabase(function () {
            Responder.success(res);
        })
    });

};