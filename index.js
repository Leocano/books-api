const express = require('express')
const app = express()
const port = process.env.port || 8000
const routes = require('./routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/books');

app.use('/', routes)
app.listen(port, function () {
    console.log("Running on port " + port);
});
