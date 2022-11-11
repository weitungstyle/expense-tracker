const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT

require('./config/mongoose')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // 取得req.body內容

//setting session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  next()
})

app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, (req, res) => {
  console.log(`The website is running on http://localhost:${port}`)
})
