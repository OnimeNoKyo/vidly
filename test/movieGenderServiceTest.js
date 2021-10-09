const assert = require('assert')
const movieGenderService = require('../src/service/movieGenderService')

describe('MovieGenderServiceTest', function () {
  describe('getAll', function () {
    it('should retrieve an array with at least 1 element', function () {
      const movieGenders = movieGenderService.getAll()
      assert.ok(movieGenders.length > 0)
    })
  })
})
