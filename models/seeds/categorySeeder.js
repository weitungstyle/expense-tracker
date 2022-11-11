if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const lodash = require('lodash')
const db = require('../../config/mongoose')
const Category = require('../category')

const CATEGORY = {
  家居物業: '<i class="fa-solid fa-house"></i>',
  交通出行: '<i class="fa-solid fa-van-shuttle"></i>',
  休閒娛樂: '<i class="fa-solid fa-face-grin-beam"></i>',
  餐飲食品: '<i class="fa-solid fa-utensils"></i>',
  其他: '<i class="fa-solid fa-pen"></i>'
}



db.once('open', () => {
  //turn object to array
  const cList = lodash.map(CATEGORY, (value, key) => {
    return {
      name: key,
      icon: value
    }
  })
  //create category items
  Promise.all(Array.from(
    cList,
    (i) => Category.create({
      name: i.name,
      icon: i.icon
    })
  ))
    .then(() => {
      console.log('Categories have been established.')
      process.exit()
    })
})
