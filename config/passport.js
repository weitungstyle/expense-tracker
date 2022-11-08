const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  //set local strategy
  passport.use(new LocalStrategy({ usernameField: email, passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false)
        }
        return bcrypt.compare(password, userpassword).then(isMatch => {
          if (!isMatch) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
      .catch(err => console.log(err))
  }))

  //set serialization
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => console.log(err))
  })
}
