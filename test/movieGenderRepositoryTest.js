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
  describe('add', () => {
    it('should get a movieGender with id 4 when add a new movieGender', async () => {
      const movieGenderRepository = new MovieGenderRepository()
      const oldLenght = movieGenderRepository.getAll().length
      const res = movieGenderRepository.add({ label: 'hihi' })
      const newLenght = movieGenderRepository.getAll().length
      assert.ok(newLenght > oldLenght)
      assert.ok(res.id === 4)
    })
  })
  describe('delete', () => {
    it('should get a list with one item remove when delete an existing movieGender', async () => {
      const movieGenderRepository = new MovieGenderRepository()
      movieGenderRepository.delete(2)
      const updatedList = movieGenderRepository.getAll()
      assert.ok(updatedList.indexOf(el => el.id === 2) < 0)
    })
  })
})
