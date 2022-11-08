module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenicated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}
