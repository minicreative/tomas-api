
// Initialize dependencies
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Moment = require("moment");

// Initialize model
let Book = Mongoose.model("Book", new Schema({
    title: String,
    time: Number,
}));

// Book Functions
module.exports = {

    // Add 
    add: function (detail, next) {
        let book = new Book({
            title: detail,
            time: Moment().format("X"),
        });
        book.save(function (err) {
            next(err);
        });
    },

    getLatest: function (next) {
        Book
            .findOne()
            .sort('-time')
            .exec(function(err, book) {
                next(err, book);
            });
    },

    getAll: function (next) {
        Book
            .find()
            .sort('-time')
            .exec(function(err, books) {
                next(err, books);
            });
    },
};