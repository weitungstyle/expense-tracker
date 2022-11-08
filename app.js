const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT

app.use('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', "hbs")



//setting session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))







app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (req, res) => {
  console.log(`The website is running on http://localhost:${port}`)
})
