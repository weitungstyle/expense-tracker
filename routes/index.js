const express = require('express')
const { authenticator } = require('../middleware/auth')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/records')
const users = require('./modules/users')

router.use('/users', users)
router.use('/records', authenticator, record)
router.use('/', authenticator, home)

module.exports = router
