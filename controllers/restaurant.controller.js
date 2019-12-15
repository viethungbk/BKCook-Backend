const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const restaurantService = require('../services/restaurant.service')

const signUp = async (req, res) => {
  const { body, files } = req
  const { name, email, password, address, phone } = body

  if (!name) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập tên nhà hàng')
  }
  if (!email) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập email nhà hàng')
  }
  if (!password) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập mật khẩu nhà hàng')
  }
  if (!address) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập địa chỉ nhà hàng')
  }
  if (!phone) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập số điện thoại nhà hàng')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho nhà hàng')
  }
  if (password.length < 7) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Mật khẩu phải có ít nhất 7 ký tự')
  }

  const rs = await restaurantService.signUp(body, files)
  res.send(rs)
}

const login = async (req, res) => {
  const { body } = req
  const { email, password } = body

  if (!email) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập email')
  }
  if (!password) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập password')
  }

  const rs = await restaurantService.login(email, password)
  res.send(rs)
}

const getInfo = async (req, res) => {
  res.send(req.restaurant)
}

module.exports = {
  signUp,
  login,
  getInfo
}
