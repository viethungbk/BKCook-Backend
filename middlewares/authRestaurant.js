require('dotenv').config()
const jwt = require('jsonwebtoken')
const Restaurant = require('../models/restaurant.model')
const errorCode = require('../errors/errorCode')
const { ResponseResult } = require('../configs/config')

const decodeUserToken = async (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const restaurant = await Restaurant.findOne({ _id: decode._id, 'tokens.token': token })

    return restaurant
  } catch (error) {
    return null
  }
}

const authRestaurant = async (req, res, next) => {
  const originToken = req.header('Authorization') || req.header('x-access-token')

  if (!originToken) {
    return res.status(errorCode.UNAUTHORIZED).send(new ResponseResult(false, {
      message: 'Truy nhập trái phép'
    }))
  }
  const token = originToken.replace('Bearer ', '')
  const restaurant = await decodeUserToken(token)

  if (!restaurant) {
    return res.status(errorCode.BAD_REQUEST).send(new ResponseResult(false, {
      message: 'Token không hợp lệ'
    }))
  }

  req.token = token
  req.restaurant = restaurant

  next()
}

module.exports = {
  authRestaurant
}
