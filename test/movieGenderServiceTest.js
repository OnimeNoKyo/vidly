const assert = require('assert')
const movieGenderService = require('../src/service/movieGenderService')

describe('MovieGenderServiceTest', function () {
  describe('getAll', function () {
    it('should retrieve an array with at least 1 element', function () {
      const movieGenders = movieGenderService.getAll()
      assert.ok(movieGenders.length > 0)
    })
  })
  describe('validate', () => {
    it('should retrieve an error when movieGender doesnt have label attribute', async () => {
      const { error } = movieGenderService.validate({ id: 1, name: 'test' })
      assert.ok(error)
    })
    it('should retrieve no error when movieGender have label attribute', async () => {
      const { error } = movieGenderService.validate({ id: 1, label: 'test' })
      assert.ok(error === undefined)
    })
  })
  describe('add', () => {
    it('should add a new movieGender', async () => {
      const initialLenght = movieGenderService.getAll().length
      movieGenderService.add({ label: 'Cartoon' })
      const newLenght = movieGenderService.getAll().length
      assert.ok(newLenght > initialLenght)
    })
  })
})
