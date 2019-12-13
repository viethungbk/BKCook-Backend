const uploadImage = require('../utils/uploadImage')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
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

module.exports = {
  signUp
}
