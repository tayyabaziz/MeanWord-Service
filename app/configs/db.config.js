const mongoose = require('mongoose')
const config = require('../../config.json')
const dbConfig = config.dbConfig[config.environment]

mongoose.connect(dbConfig.urlString, { useNewUrlParser: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', function (err) {
  console.error('Unable to connect to the database:', err.message)
  process.exit()
})
db.once('open', function () {
  // we're connected!
  console.log('Connection has been established successfully.')
})

// module.exports = mongoose
