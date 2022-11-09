const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const User = require('../user')
const Record = require('../record')

const userList = require('./user.json')
const recordList = require('./record.json')

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(userList[0].password, salt))
    .then(hash => User.create({
      name: userList[0].name,
      email: userList[0].email,
      password: hash
    }))
    .then(user => {
      const userId = user.id
      Record.create({
        name: recordList[0].name,
        date: recordList[0].date,
        amount: recordList[0].amount,
        userId: userId
      })
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})
