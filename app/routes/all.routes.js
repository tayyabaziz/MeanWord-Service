const express = require('express')
const app = express()

app.use('/word', require('./words.route'))

module.exports = app
