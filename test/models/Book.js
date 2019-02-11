const assert = require('assert')
const mongoose = require('mongoose')
const Book = require('../../models/Book')

describe('BookModel', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/booksTest')
    mongoose.connection
    .once('open', () => {
      console.log('Connected to test database!')
      done()
    })
    .on('error', (error) => {
      console.warn('Could not connect to database:', error);
      done()
    })
  })

  it('should not create book with empty parameters', () => {
    const book = new Book()
    book.save((err) => {
      assert.notEqual(err, null);
    })
  })
})