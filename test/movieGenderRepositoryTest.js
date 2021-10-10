const assert = require('assert')

const MovieGenderRepository = require('../src/repository/movieGenderRepositoryMock')

describe('MovieGenderRepositoryTest', () => {
  describe('getAll', () => {
    it('should return not empty list when movieGenders exist', async () => {
      const movieGenderRepository = new MovieGenderRepository()
      const res = movieGenderRepository.getAll()
      assert.ok(res)
    })
    it('should return an empty list when no movieGenders exist', async () => {
      const movieGenderRepository = new MovieGenderRepository()
      const res = movieGenderRepository.getAll()
      assert.ok(res)
    })
  })
})
