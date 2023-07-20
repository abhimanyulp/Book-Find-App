const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: String
})

const BookModel = mongoose.model("book", bookSchema)

module.exports = { BookModel }