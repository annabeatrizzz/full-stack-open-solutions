const router = require('express').Router()

const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('count', sequelize.col('id')), 'articles'],
      [sequelize.fn('sum', sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    raw: true
  })
  res.json(authors)
})

module.exports = router
