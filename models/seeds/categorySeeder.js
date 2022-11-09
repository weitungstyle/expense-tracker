if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const _ = require('lodash')
const db = require('../../config/mongoose')
const Category = require('../category')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

const cList = _.map(CATEGORY, (value, key) => {
  return {
    name: key,
    image: value
  }
})

// db.once('open', () => {
//   for (i in CATEGORY) {
//     Category.create({
//       name: i,
//       image: CATEGORY[i]
//     })
//   }
// })

db.once('open', () => {
  //   let functionList = []
  //   for (i in CATEGORY) {
  //     functionList = [...functionList, Category.create({ name: i, image: CATEGORY[i] })]
  //   }

  //   console.log(functionList)
  //   Promise.all(functionList, (i) => Category.create({ name: i, image: CATEGORY[i] }))
  //   .then(() => { console.log('Category has been established.') })
  // process.exit()
  // })

  Promise.all(Array.from(
    cList,
    (i) => Category.create({
      name: i.name,
      image: i.image
    })
  ))
    .then(() => {
      console.log('Category has been established.')
      process.exit()
    })
})
