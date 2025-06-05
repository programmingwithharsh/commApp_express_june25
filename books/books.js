const express = require("express");
require('../db/db');

const Book = require('./Book');

const app = express();
const port = 3000;
app.use(express.json());

// GET API
app.get('/books', (req, res) => {
    Book.find().then((books) => {
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(400).send('Book not found');
        }
    })
})

// dynamic url
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book);
        } else {
            res.status(400).send('Book not found');
        }
    })
});

app.post('/book', (req, res) => {
    const newBook = new Book({ ...req.body });
    newBook.save().then(() => {
        res.send('New Book Created Successfully');
    }).catch(() => {
        res.status(500).send('Internal Server Error');
    })
});

// dynamic url
app.delete('/book/:id', (req, res) => {
    Book.findOneAndDelete(req.params.id).then((book) => {
        if (book) {
            res.json('Book deleted Successfully');
        } else {
            res.status(400).send('Book not found');
        }
    })
});

app.listen(port, () => {
    console.log(`Book Application is listening on port ${port}`)
})
