const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('book', bookSchema);