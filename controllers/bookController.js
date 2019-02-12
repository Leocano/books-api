const Book = require('../models/Book')
const rp = require('request-promise')
const cheerio = require('cheerio')

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
      const $ = cheerio.load(html)
      const books = []
      const titles = $('article.page-content h2').map((i, title) => {
        return $(title).text()
      }).get()
      const languages = $('article.page-content .book-lang').map((i, language) => {
        return $(language).text()
      }).get()
      const descriptions = $('article.page-content p:not(p + p)').map((i, description) => {
        return $(description).text()
      }).get()

      for(let i = 0;i < titles.length;i++) {
        books.push({
          title: titles[i],
          language: languages[i],
          description: descriptions[i]
        })
      }
      
      res.send({
        numberBooks: books.length,
        books: books
      })
    })
    .catch((err) => {
      res.send(err)
    })
}
