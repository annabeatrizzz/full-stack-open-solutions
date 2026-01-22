const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { User, Session } = require('../models')

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

const sessionValidator = async (req, res, next) => {
  const authorization = req.get('authorization')
  const token = authorization.substring(7)

  const session = await Session.findOne({
    where: {
      token: token
    }
  })

  if (!session) {
    return res.status(401).json({ error: 'session not found or has been revoked' })
  }

  const user = await User.findByPk(session.userId)

  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  if (user.disabled) {
    return res.status(403).json({ error: 'user account is disabled' })
  }

  req.user = user
  next()
}

module.exports = {
  tokenExtractor,
  sessionValidator
}
