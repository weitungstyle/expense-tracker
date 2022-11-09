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
  const categories = await Category.find().lean()
  Promise.all(userList.map(user => {
    const { name, email, password } = user
    return User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
  }))
    .then(async () => {
      console.log('User has bean created.')
      const users = await User.find().lean()
      await Promise.all(recordList.map(record => {
        const { name, date, amount } = record
        const user = users.find(user => record.user === user.name)._id
        const category = categories.find(category => record.category === category.name)._id
        return Record.create({
          name,
          date,
          amount,
          userId: user,
          categoryId: category
        })
          .catch(err => console.log(err))
      }))
    })

    .then(() => {
      console.log('Records have been established.')
      process.exit()
    })
})

//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(userList[0].password, salt))
//     .then(hash => User.create({
//       name: userList[0].name,
//       email: userList[0].email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user.id
//       Record.create({
//         name: recordList[0].name,
//         date: recordList[0].date,
//         amount: recordList[0].amount,
//         userId: userId
//       })
//     })
//     .then(() => {
//       console.log('done')
//       process.exit()
//     })
// })
