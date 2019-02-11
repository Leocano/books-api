const express = require('express')
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => {
    res.send('Hello Express')
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})