const Joi = require('joi')
const MovieGenderRepository = require('../repository/movieGenderRepository')

function MovieGenderService (movieGenderRepository) {
  this.movieGenderRepository = movieGenderRepository
}

MovieGenderService.prototype.getAll = function () {
  return this.movieGenderRepository.getAll()
}

MovieGenderService.prototype.add = function (newMovieGender) {
  const movieGenderCreated = this.movieGenderRepository.add(newMovieGender)
  return movieGenderCreated
}

MovieGenderService.prototype.validate = function (movieGender) {
  const schema = Joi.object({
    label: Joi.string().min(3).required()
  }).unknown(true)
  return schema.validate(movieGender)
}

function create (movieGenderRepository) {
  if (movieGenderRepository === undefined || movieGenderRepository instanceof MovieGenderRepository === false) {
    throw Error('Dependency Injection Error')
  }
  return new MovieGenderService(movieGenderRepository)
}

module.exports = { MovieGenderService, create }
