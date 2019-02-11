const Book = require('../models/Book');

exports.create = (req, res) => {
    const book = new Book();
    book.title = req.body.title;
    book.description = req.body.description;
    book.isbn = req.body.isbn;
    book.language = req.body.language;
    book.save((err) => {
        if (err) {
            res.json(err);
        }
        res.json(book);
    });
};
