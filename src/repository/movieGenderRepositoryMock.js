const MovieGenderRepository = require('./movieGenderRepository')

const movieGenders = [
  { id: 1, label: 'Horror' },
  { id: 2, label: 'Sci-Fi' },
  { id: 3, label: 'Romantic' }
]

function MovieGenderRepositoryMock (options) {
  this.options = options === undefined ? {} : options
  if ('movieGenders' in this.options === false) {
    this.movieGenders = movieGenders
  }
}

MovieGenderRepositoryMock.prototype = Object.create(MovieGenderRepository.prototype, {
  constructor: {
    value: MovieGenderRepositoryMock,
    enumerable: false
  }
})

MovieGenderRepositoryMock.prototype.getAll = function () {
  return this.movieGenders
}

function create (options) {
  return new MovieGenderRepositoryMock(options)
}

module.exports = { MovieGenderRepositoryMock, create }
