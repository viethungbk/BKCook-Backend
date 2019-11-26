require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const { ResponseResult } = require('../configs/config')
const { roleType } = require('../configs/config')

const decodeUserToken = async (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token })

    return user
  } catch (error) {
    return null
  }
}

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '') ||
  req.header('x-access-token').replace('Bearer ', '')

  if (!token) {
    res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  const user = decodeUserToken(token)

  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Token không hợp lệ')
  }

  req.token = token
  req.user = user

  next()
}

const authAdmin = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '') ||
  req.header('x-access-token').replace('Bearer ', '')

  if (!token) {
    res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  const user = decodeUserToken(token)

  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Token không hợp lệ')
  }

  if (!user.role || user.role !== roleType.ADMIN) {
    res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  req.token = token
  req.user = user

  next()
}

const authCensor = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '') ||
  req.header('x-access-token').replace('Bearer ', '')

  if (!token) {
    res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  const user = decodeUserToken(token)

  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Token không hợp lệ')
  }

  if (!user.role || !(user.role === roleType.CENSOR || user.role === roleType.ADMIN)) {
    res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  req.token = token
  req.user = user

  next()
}

const authUser = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '') ||
  req.header('x-access-token').replace('Bearer ', '')

  if (!token) {
    res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  const user = decodeUserToken(token)

  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Token không hợp lệ')
  }

  req.token = token
  req.user = user

  next()
}

const looseAuth = async (req, res, next) => {
  console.log('Loose Auth')
  const originToken = req.header('Authorization') || req.header('x-access-token')

  if (!originToken) {
    console.log('Auth Token undefined')
    return next()
  }

  const token = originToken.replace('Bearer ', '')
  const user = await decodeUserToken(token)

  if (!user) {
    return res.status(errorCode.BAD_REQUEST).send(new ResponseResult(false, {
      message: 'Token không hợp lệ'
    }))
  }

  req.token = token
  req.user = user

  next()
}

module.exports = {
  auth,
  authAdmin,
  authCensor,
  authUser,
  looseAuth
}
