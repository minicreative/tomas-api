
// Initialize dependencies
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Moment = require("moment");

// Initialize model
let Book = mongoose.model("Book", new Schema({
    title: String,
    time: Number,
}));

// Book Functions
module.exports = {

    // Add 
    add: function (title, next) {
        let book = new Book({
            title: title,
            time: moment().format("X"),
        });
        book.save(function (err) {
            next(err);
        });
    },
};