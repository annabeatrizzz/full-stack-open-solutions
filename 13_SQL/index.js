const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controller/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: err.message })
  }

  return res.status(400).json({ error: err.message })
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()