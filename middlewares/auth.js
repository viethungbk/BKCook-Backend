require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const errorCode = require('../errors/errorCode')
const { ResponseResult } = require('../configs/config')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '') ||
      req.header('x-access-token').replace('Bearer ', '')

    if (!token) {
      return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
        message: 'Truy nhập trái phép'
      }))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token })

    if (!user) {
      throw new Error('Không thể xác thực')
    }

    req.token = token
    req.user = user
    console.log('token: ', token)
    console.log('user: ', user)
    next()
  } catch (e) {
    return res.status(errorCode.BAD_REQUEST).send(new ResponseResult(false, {
      message: 'Token không hợp lệ'
    }))
  }
}

module.exports = auth
