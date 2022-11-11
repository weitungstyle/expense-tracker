module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('請登入後使用')
    res.redirect('/users/login')
  }
}
