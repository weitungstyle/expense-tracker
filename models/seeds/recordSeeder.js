const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const User = require('../user')
const Record = require('../record')

const userList = require('./user.json')
const recordList = require('./record.json')
const db = require('../../config/mongoose')

db.once('open', async () => {
  //take category item id
  const categories = await Category.find().lean()
  //create user items
  Promise.all(userList.map(user => {
    const { name, email, password } = user
    return User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
  }))
    .then(async () => {
      console.log('Users have bean created.')
      //take user item id
      const users = await User.find().lean()
      //create record items
      await Promise.all(recordList.map(record => {
        const { name, date, amount } = record
        const user = users.find(user => record.user === user.name)._id
        const category = categories.find(category => record.category === category.name)._id
        const icon = categories.find(category => record.category === category.name).icon
        return Record.create({
          name,
          date,
          amount,
          userId: user,
          categoryId: category,
          icon
        })
          .catch(err => console.log(err))
      }))
    })
    .then(() => {
      console.log('Records have been established.')
      process.exit()
    })
})
