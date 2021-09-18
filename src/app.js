const express = require('express')
const app = express()

const hostname = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  const message = {
    message: 'Welcome to Vidly'
  }
  return res.set('Content-Type', 'application/json').send(JSON.stringify(message))
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
