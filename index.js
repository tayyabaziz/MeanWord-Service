const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config.json')

const app = express()

if (config.appConfig.compression) {
  // compress all response
  const compression = require('compression')
  app.use(compression())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'Service is OK.' })
  res.end()
})

var routes = require('./app/routes/all.routes')
app.use('/api', routes)

app.listen(config.appConfig.port, () => {
  console.log('Server is listening on port ' + config.appConfig.port)
})
