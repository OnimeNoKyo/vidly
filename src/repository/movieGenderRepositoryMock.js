const { checkPreferences } = require('joi')
const MovieGenderRepository = require('./movieGenderRepository')

const _defaultMovieGenders = [
  { id: 1, label: 'Horror' },
  { id: 2, label: 'Sci-Fi' },
  { id: 3, label: 'Romantic' }
]

function MovieGenderRepositoryMock (options) {
  MovieGenderRepositoryMock.super_.apply(this, options)
  this.options = options === undefined ? {} : options
  if ('movieGenders' in this.options === false) {
    this.movieGenders = _defaultMovieGenders
  }
}

MovieGenderRepositoryMock.super_ = MovieGenderRepository

MovieGenderRepositoryMock.prototype = Object.create(MovieGenderRepository.prototype, {
  constructor: {
    value: MovieGenderRepository,
    enumerable: false
  }
})

MovieGenderRepositoryMock.prototype.get = function (movieGenderId) {
  return this.movieGenders.filter(el => {
    return el.id === movieGenderId
  })
}

MovieGenderRepositoryMock.prototype.getAll = function () {
  return this.movieGenders
}

MovieGenderRepositoryMock.prototype.add = function (movieGender) {
  const lastAvailableId = this.movieGenders.flatMap((e) => {
    return e.id
  }).sort((a, b) => a - b)[this.movieGenders.length - 1]
  const movieGenderCreated = { id: lastAvailableId + 1, label: movieGender.label }
  this.movieGenders.push(movieGenderCreated)
  return movieGenderCreated
}

MovieGenderRepositoryMock.prototype.delete = function (movieGenderId) {
  this.movieGenders = this.movieGenders.filter(el => {
    return el.id !== movieGenderId
  })
}

module.exports = MovieGenderRepositoryMock
