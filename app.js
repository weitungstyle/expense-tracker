const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT

const app = express()

app.get('/', (req, res) => {
  console.log('test')
})

app.listen(port, (req, res) => {
  console.log(`The website is running on http://localhost:${port}`)
})
