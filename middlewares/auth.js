require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const { ResponseResult } = require('../configs/config')
const { role } = require('../configs/config')

const decodeUserToken = async (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token })

    return user
  } catch (error) {
    return null
  }
}

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '') ||
  req.header('x-access-token').replace('Bearer ', '')

  if (!token) {
    return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
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
    return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  const user = decodeUserToken(token)

  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Token không hợp lệ')
  }

  if (!user.role || user.role !== role.ADMIN) {
    return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
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
    return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }

  const user = decodeUserToken(token)

  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Token không hợp lệ')
  }

  if (!user.role || !(user.role === role.CENSOR || user.role === role.ADMIN)) {
    return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
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
    return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
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

module.exports = {
  auth,
  authAdmin,
  authCensor,
  authUser
}
