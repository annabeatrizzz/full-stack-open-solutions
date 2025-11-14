const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'Title, author, and url are required for new blog entry.'
    }) 
  }

  if (!blog.likes) {
    blog.likes = 0
  }
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() !== user.id.toString() ) {
    response.status(403).end()
  }
  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  
  if (!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.title = request.body.title
  blogToUpdate.author = request.body.author
  blogToUpdate.url = request.body.url
  blogToUpdate.likes = request.body.likes

  const savedBlog = await blogToUpdate.save()
  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(200).json(populatedBlog)
})

module.exports = blogsRouter