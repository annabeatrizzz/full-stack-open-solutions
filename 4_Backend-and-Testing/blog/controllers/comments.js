const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', { title: 1, author: 1 })
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.content || !body.blogId) {
    return response.status(400).json({ error: 'content or blog ID missing or not valid' })
  }

  const blog = await Blog.findById(body.blogId)
  if (!blog) {
    return response.status(400).json({ error: 'blog not found' })
  }

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })
  
  const savedComment = await comment.save()
  if (!Array.isArray(blog.comments)) {
      blog.comments = []
  }
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  const populatedComment = await savedComment.populate('blog', { title: 1, author: 1 })
  response.status(201).json(populatedComment)
})

module.exports = commentsRouter