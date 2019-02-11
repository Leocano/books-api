const router = require('express').Router()
const bookController = require('./controllers/bookController')

router.post('/book', bookController.create)

router.get('/book/:book_id', bookController.view)

module.exports = router