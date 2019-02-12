const assert = require('assert')
const mongoose = require('mongoose')
const Book = require('../../models/Book')

describe('Book Model', () => {
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

  it('should create book', () => {
    const book = new Book()
    book.title = 'Hitchhiker\'s Guide to the Galaxy';
    book.description = 'Amazing adventure';
    book.isbn = '17364946723';
    book.language = 'EN';
    book.save((err) => {
      assert.equal(err, null)
    })
  })

  it('should not create book with empty parameters', () => {
    const book = new Book()
    book.save((err) => {
      assert.notEqual(err, null);
    })
  })

  after((done) => {
    mongoose.connection.db.dropCollection('books', () => {
      done()
    })
  })
})