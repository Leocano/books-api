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
    .then(html => {
      const $ = cheerio.load(html)
      const books = []
      const titles = $('article.page-content > h2').map((i, title) => {
        return $(title).text()
      }).get()

      const languages = $('article.page-content > .book-lang').map((i, language) => {
        return $(language).text()
      }).get()

      const descriptions = $('article.page-content > p:not(p + p)').map((i, description) => {
        return $(description).text()
      }).get()

      const links = $('article.page-content > a').map((i, link) => {
        return $(link).attr('href')
      }).get()

      const isbn = links.map(link => {
        return new Promise((resolve, reject) => {
          rp(link)
            .then(html => {
              const isbnPosition = html.indexOf("isbn")
              if (isbnPosition >= 0) {
                resolve(html.substring(isbnPosition + 6, isbnPosition + 19))
              } else {
                const isbnPosition = html.indexOf("ISBN")
                if (isbnPosition >= 0) {
                  resolve(html.substring(isbnPosition + 5, isbnPosition + 18))
                } else {
                  resolve("unavailable")
                }
              }
            })
            .catch(error => {
              resolve("unavailable")
            })
        })
      })

      Promise.all(isbn)
        .then(isbn => {
          for(let i = 0;i < titles.length;i++) {
            books.push({
              title: titles[i],
              language: languages[i],
              description: descriptions[i],
              isbn: isbn[i]
            })
          }

          res.send({
            numberBooks: books.length,
            books: books
          })
        })
        .catch(error => {
          res.send(error)
        })
    })
    .catch((err) => {
      res.send(err)
    })
}
