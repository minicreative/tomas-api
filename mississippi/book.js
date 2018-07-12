
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
    add: function (title, next) {
        let book = new Book({
            title: title,
            time: Moment().format("X"),
        });
        book.save(function (err) {
            next(err);
        });
    },
};