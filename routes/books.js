const express = require("express");
const router = express.Router();
const Book = require('../models/Book');

// GET API
router.get('/', (req, res) => {
    Book.find().then((books) => {
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(400).send('Book not found');
        }
    })
})

// dynamic url
router.get('/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book);
        } else {
            res.status(400).send('Book not found');
        }
    })
});

router.post('/', (req, res) => {
    const newBook = new Book({ ...req.body });
    newBook.save().then(() => {
        res.send('New Book Created Successfully');
    }).catch(() => {
        res.status(500).send('Internal Server Error');
    })
});

// dynamic url
router.delete('/:id', (req, res) => {
    Book.findOneAndDelete(req.params.id).then((book) => {
        if (book) {
            res.json('Book deleted Successfully');
        } else {
            res.status(400).send('Book not found');
        }
    })
});

module.exports = router;