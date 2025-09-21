const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'Title, author, and url are required for new blog entry.'
    }) 
  }

  if (!blog.likes) {
    blog.likes = 0
  }
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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
  response.status(200).json(savedBlog)
})

module.exports = blogsRouter