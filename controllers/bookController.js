const Book = require('../models/Book');

exports.index = (req, res) => {
    Book.get((err, books) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: "Books retrieved",
            data: books
        });
    });
};
