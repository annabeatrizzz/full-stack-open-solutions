const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const { User, Session } = require('../models')
const { tokenExtractor, sessionValidator } = require('../utils/middleware')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account is disabled'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  // Create session in database
  await Session.create({
    userId: user.id,
    token: token
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

router.delete('/', tokenExtractor, sessionValidator, async (request, response) => {
  const authorization = request.get('authorization')
  const token = authorization.substring(7)

  await Session.destroy({
    where: {
      token: token
    }
  })

  response.status(204).end()
})

module.exports = router
