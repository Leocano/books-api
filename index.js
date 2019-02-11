const express = require('express')
const app = express()
const port = process.env.port || 8000
const routes = require('./routes')

app.use('/', routes)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})