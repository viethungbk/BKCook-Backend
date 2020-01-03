const bcrypt = require('bcryptjs')

const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const User = require('../models/user.model')
const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')

const signup = async (userInfo) => {
  const { email } = userInfo

  const checkExistEmail = await User.findOne({ email })
  if (checkExistEmail) {
    throw new CustomError(errorCode.CONFLICT, 'Email đã tồn tại')
  }

  const user = await User.create(userInfo)
  const token = await user.generateAuthToken()

  return new ResponseResult(true, { user, token })
}

const login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Tài khoản hoặc mật khẩu không đúng')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Tài khoản hoặc mật khẩu không đúng')
  }

  const token = await user.generateAuthToken()

  return new ResponseResult(true, { user, token })
}

const logout = async (user, currentToken) => {
  user.tokens = user.tokens.filter(({ token }) => token !== currentToken)
  await user.save()
}

async function logoutAllDevice (user) {
  user.tokens = []
  await user.save()
}

const updateInfoUser = async (user, infoUpdates) => {
  const { name, gender, oldPassword, newPassword } = infoUpdates

  if (oldPassword && newPassword) {
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      throw new CustomError(errorCode.FORBIDDEN, 'Mật khẫu cũ không chính xác')
    }

    if (oldPassword === newPassword) {
      throw new CustomError(
        errorCode.BAD_REQUEST,
        'Bạn phải nhập mật khẩu cũ khác mật khẩu mới'
      )
    }

    user.password = newPassword
  }

  if (name && name !== user.name) {
    user.name = name
  }

  if (gender && gender !== user.gender) {
    user.gender = gender
  }

  await user.save()

  return user
}

const uploadAvatar = async (user, avatar) => {
  const avatarLink = await uploadImage(avatar, '/images/avatar')

  user.avatar = avatarLink
  await user.save()

  return user
}

const getTotalUser = async () => {
  const data = await User.countDocuments({})
  if (!data) {
    throw new Error('Không thể lấy tổng số người dùng')
  }
  return new ResponseResult(true, data)
}

const getAllUsers = async () => {
  const data = await User.find({})
  if (!data) {
    throw new Error('Không thể lấy danh sách người dùng')
  }
  return new ResponseResult(true, data)
}

module.exports = {
  signup,
  login,
  logout,
  logoutAllDevice,
  updateInfoUser,
  uploadAvatar,
  getTotalUser,
  getAllUsers
}
