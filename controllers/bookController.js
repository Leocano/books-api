const Book = require('../models/Book')
const rp = require('request-promise')

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

exports.view = (req, res) => {
  Book.findById(req.params.book_id, (err, book) => {
    if (err) {
      res.send(err)
    }
    res.json(book)
  })
}

exports.search = (req, res) => {
  const url = 'https://kotlinlang.org/docs/books.html'
  rp(url)
    .then((html) => {
      res.send(html)
    })
    .catch((err) => {
      res.send(err)
    })
}
