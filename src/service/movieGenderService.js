const Joi = require('joi')

const movieGenders = [
  { id: 1, label: 'Horror' },
  { id: 2, label: 'Sci-Fi' },
  { id: 3, label: 'Romantic' }
]

function getAll () {
  return movieGenders
}

function add (newMovieGender) {
  const lastAvailableId = movieGenders.flatMap((e) => {
    return e.id
  }).sort((a, b) => a - b)[movieGenders.length - 1]

  movieGenders.push({ id: lastAvailableId + 1, label: newMovieGender.label })
}

function validate (movieGender) {
  const schema = Joi.object({
    label: Joi.string().min(3).required()
  }).unknown(true)
  return schema.validate(movieGender)
}

module.exports = { getAll, validate, add }
