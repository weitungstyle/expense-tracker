const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
})

router.post('/', async (req, res) => {
  const { name, date, amount, category } = req.body
  const userId = req.user._id
  const categories = await Category.find().lean()
  const categoryId = categories.find(item => category === item.name)._id
  const icon = categories.find(item => category === item.name).icon
  return Record.create({
    name,
    date,
    amount,
    userId,
    categoryId,
    icon
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const categories = await Category.find().lean()
  Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      categories.forEach(category => {
        if (category._id.toString() === record.categoryId.toString()) {
          category.selected = true
        }
      })
      record.date = record.date.toLocaleDateString('fr-CA',
        { year: 'numeric', month: '2-digit', day: '2-digit' })
      res.render('edit', { record, categories })
    })
    .catch(err => console.log(err))
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
  const { name, date, amount, category } = req.body
  const userId = req.user._id
  const categories = await Category.find().lean()
  const categoryId = categories.find(item => category === item.name)._id
  const icon = categories.find(item => category === item.name).icon
  Record.findOne({ _id, userId })
    .then(record => {
      record.name = name,
        record.date = date,
        record.amount = amount,
        record.categoryId = categoryId,
        record.icon = icon
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
