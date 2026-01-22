const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { Blog, User, ReadingList } = require('../models')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id, {
    attributes: { exclude: [''] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['id', 'read']
        }
      }
    ]
  })
  
  const formattedList = user.blogs.map(blog => ({
    id: blog.id,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes,
    year: blog.year,
    readingListId: blog.reading_list.id,
    read: blog.reading_list.read
  }))
  
  res.json(formattedList)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.body.blogId)
    
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    
    const existingEntry = await ReadingList.findOne({
      where: {
        userId: user.id,
        blogId: blog.id
      }
    })
    
    if (existingEntry) {
      return res.status(409).json({ error: 'blog already in reading list' })
    }
    
    const readingListEntry = await ReadingList.create({
      userId: user.id,
      blogId: blog.id,
      read: false
    })
    
    res.status(201).json(readingListEntry)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  try {
    const readingListEntry = await ReadingList.findByPk(req.params.id)
    
    if (!readingListEntry) {
      return res.status(404).json({ error: 'reading list entry not found' })
    }
    
    if (readingListEntry.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: 'only the user can modify their reading list' })
    }
    
    readingListEntry.read = req.body.read
    await readingListEntry.save()
    
    res.json(readingListEntry)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
