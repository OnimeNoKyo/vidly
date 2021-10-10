const express = require('express')
const MovieGenderRepositoryMock = require('./repository/movieGenderRepositoryMock')
const root = express()
const app = express()
const MovieGenderService = require('./service/movieGenderService')
const movieGenderService = MovieGenderService.create(new MovieGenderRepositoryMock())

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

app.route('/movieGenders/:movieGenderId')
  .delete((req, res, next) => {
    const movieGenderId = parseInt(req.params.movieGenderId)
    if (movieGenderId === undefined) {
      return res.type('json').status(400).send({ errors: [{ code: '003', message: 'Invalid query parameter format' }] })
    }
    if (movieGenderService.get(movieGenderId).length === 0) {
      return res.type('json').status(404).send({ errors: [{ code: '004', message: 'Not found' }] })
    }
    movieGenderService.delete(movieGenderId)
    return res.type('json').status(204).send()
  })

root.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
