const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find().lean()
  const selectedCategory = req.query.selectedCategory
  if (!selectedCategory) {
    Record.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then(records => {
        let totalAmount = 0
        records.forEach(record => {
          record.date = record.date.toLocaleDateString()
          totalAmount += record.amount
        })
        return res.render('index', { records, categories, totalAmount })
      })
      .catch(err => console.log(err))
  } else {
    const categoryId = categories.find(category => selectedCategory === category.name)._id
    Record.find({ userId, categoryId })
      .lean()
      .sort({ _id: 'asc' })
      .then(records => {
        let totalAmount = 0
        records.forEach(record => {
          record.date = record.date.toLocaleDateString()
          totalAmount += record.amount
        })
        return res.render('index', { records, categories, totalAmount })
      })
      .catch(err => console.log(err))
  }
})

module.exports = router
