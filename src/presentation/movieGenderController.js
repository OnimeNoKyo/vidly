const express = require('express')
const router = express.Router()

const MovieGenderRepositoryMock = require('../repository/movieGenderRepositoryMock')
const MovieGenderService = require('../service/movieGenderService')
const movieGenderService = MovieGenderService.create(new MovieGenderRepositoryMock())

router.route('/')
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

router.route('/:movieGenderId')
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

module.exports = router
