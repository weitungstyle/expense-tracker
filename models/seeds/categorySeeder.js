if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const lodash = require('lodash')
const db = require('../../config/mongoose')
const Category = require('../category')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}



db.once('open', () => {
  //turn object to array
  const cList = lodash.map(CATEGORY, (value, key) => {
    return {
      name: key,
      image: value
    }
  })
  //create category items
  Promise.all(Array.from(
    cList,
    (i) => Category.create({
      name: i.name,
      image: i.image
    })
  ))
    .then(() => {
      console.log('Categories have been established.')
      process.exit()
    })
})
