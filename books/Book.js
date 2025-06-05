const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    }
})

const book = mongoose.model('book', bookSchema);
module.exports = book;