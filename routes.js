const router = require('express').Router()
const bookController = require('./controllers/bookController')

router.post('/book', bookController.create)
router.get('/books/:book_id', bookController.view)
router.get('/books', bookController.search)

module.exports = router