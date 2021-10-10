const MovieGenderRepository = require('./movieGenderRepository')

const movieGenders = [
  { id: 1, label: 'Horror' },
  { id: 2, label: 'Sci-Fi' },
  { id: 3, label: 'Romantic' }
]

function MovieGenderRepositoryMock (options) {
  MovieGenderRepositoryMock.super_.apply(this, options)
  this.options = options === undefined ? {} : options
  if ('movieGenders' in this.options === false) {
    this.movieGenders = movieGenders
  }
}

MovieGenderRepositoryMock.super_ = MovieGenderRepository

MovieGenderRepositoryMock.prototype = Object.create(MovieGenderRepository.prototype, {
  constructor: {
    value: MovieGenderRepository,
    enumerable: false
  }
})

MovieGenderRepositoryMock.prototype.getAll = function () {
  return this.movieGenders
}

MovieGenderRepositoryMock.prototype.add = function (movieGender) {
  const lastAvailableId = movieGenders.flatMap((e) => {
    return e.id
  }).sort((a, b) => a - b)[movieGenders.length - 1]
  const movieGenderCreated = { id: lastAvailableId + 1, label: movieGender.label }
  movieGenders.push(movieGenderCreated)
  return movieGenderCreated
}

module.exports = MovieGenderRepositoryMock
