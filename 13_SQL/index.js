const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const authorsRouter = require('./controller/authors')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => `Validation ${e.validatorKey} on ${e.path} failed`)
    return res.status(400).json({ error: errors })
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => `${e.message}`)
    return res.status(400).json({ error: errors })
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