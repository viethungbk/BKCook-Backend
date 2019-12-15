const bcrypt = require('bcryptjs')

const uploadImage = require('../utils/uploadImage')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const Restaurant = require('../models/restaurant.model')
const { ResponseResult } = require('../configs/config')
const {
  getRestaurantByEmail,
  signUpDb
} = require('../db/restaurant.db')

const signUp = async (body, files) => {
  const { email } = body

  if (await getRestaurantByEmail(email)) {
    throw new CustomError(errorCode.CONFLICT, 'Email đã tồn tại')
  }

  const { image } = files
  const imageLink = await uploadImage(image, '/images/restaurants')
  const restaurant = {
    ...body,
    image: imageLink
  }
  const data = await signUpDb(restaurant)

  return new ResponseResult(true, data)
}

const login = async (email, password) => {
  const restaurant = await Restaurant.findOne({ email })
  if (!restaurant) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Tài khoản hoặc mật khẩu không đúng')
  }

  const isMatch = await bcrypt.compare(password, restaurant.password)
  if (!isMatch) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Tài khoản hoặc mật khẩu không đúng')
  }

  const token = await restaurant.generateAuthToken()

  return new ResponseResult(true, { restaurant, token })
}

module.exports = {
  signUp,
  login
}
