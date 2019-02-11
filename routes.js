const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        book: 'The Hitchhikers guide to the galaxy'
    })
})

module.exports = router