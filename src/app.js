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
    if (req.body === undefined) {
      return res.type('json').status(500).send({ errors: [{ code: '001', message: 'Unexpected Error' }] })
    }
    const { error, value } = movieGenderService.validate(req.body)
    if (error) {
      return res.type('json').status(400).send({ errors: [{ code: '002', message: error.details[0].message }] })
    }
    const newMovieGender = movieGenderService.add(value)
    return res.type('json').status(201).send(JSON.stringify(newMovieGender))
  })

root.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
