const express = require('express')
const router = express.Router()

router.get('/record', (req, res) => {
  res.render('index')
})

module.exports = router
