const express = require('express')
const mongoose = require('mongoose')

const app = express()

const { info, error } = require('./utils/logger.js')
const { PORT, MONGO_URI } = require('./utils/config.js')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGO_URI)

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})