const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { SECRET } = require('../utils/config')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const blog = req.blog

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blog.userId !== req.user.id) {
    return res.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await blog.destroy()
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const user = await User.findOne()
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.substring]: req.query.search
        }
      }, 
      {
        author: {
          [Op.substring]: req.query.search
        }
      }, 
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where 
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
  res.json(blog)
})

module.exports = router