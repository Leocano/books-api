const router = require('express').Router()
const bookController = require('./controllers/bookController')

router.post('/book', bookController.create)

module.exports = router