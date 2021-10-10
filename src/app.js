const express = require('express')
const root = express()
const app = express()
const movieGenderService = require('./service/movieGenderService')

const hostname = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(express.json()) // for parsing application/json

root.use('/vidly/v1', app)

app.get('/', (req, res) => {
  const message = {
    message: 'Welcome to Vidly'
  }
  return res.type('json').send(JSON.stringify(message))
})

app.route('/movieGenders')
  .get((req, res, next) => {
    const movieGenders = movieGenderService.getAll()
    return res.type('json').send(JSON.stringify(movieGenders))
  })
  .post((req, res, next) => {
    //
  })

root.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
