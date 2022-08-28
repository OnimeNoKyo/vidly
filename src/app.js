const express = require('express')
const root = express()
const movieGenderController = require('./presentation/movieGenderController')
const app = express()

const hostname = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(express.json()) // for parsing application/json

root.use('/vidly/v1', app)
app.use('/movieGenders', movieGenderController)

app.get('/', (req, res) => {
  const message = {
    message: 'Welcome to Vidly'
  }
  return res.type('json').send(JSON.stringify(message))
})

root.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
