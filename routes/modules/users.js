const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureMessage: true,
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password) {
    errors.push({ message: '請填選所有必填項目' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '請確認密碼填寫正確' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個帳號已被使用' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        .then(hash => User.crrate({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err) }
    req.flash('success_msg', '您已成功登出')
    res.redirect('/users/login')
  })
})


module.exports = router
