const validator = require('validator')
const userService = require('../services/user.service')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')

const signup = async (req, res) => {
  const { email } = req.body

  if (!validator.isEmail(email)) {
    throw new Error('Email không hợp lệ')
  }

  const { user, token } = await userService.signup(req.body)

  res.send({
    status: 1,
    results: {
      user,
      token
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  const { user, token } = await userService.login(email, password)

  res.send({
    status: 1,
    results: {
      user,
      token
    }
  })
}

const logout = async (req, res) => {
  await userService.logout(req.user, req.token)
  res.send({ status: 1 })
}

async function logoutAllDevice (req, res) {
  await userService.logoutAllDevice(req.user)
  res.send({ status: 1 })
}

async function getInfoUser (req, res) {
  res.send({
    status: 1,
    results: {
      user: req.user
    }
  })
}

const updateInfoUser = async (req, res) => {
  const infoUpdates = req.body
  const user = await userService.updateInfoUser(req.user, infoUpdates)

  res.send({
    status: 1,
    results: {
      user
    }
  })
}

async function uploadAvatar (req, res) {
  const { avatar } = req.files
  if (!avatar.name.match(/\.(jpg|png|jpeg)$/)) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Hãy tải lên đúng định dạng ảnh'
    )
  }

  const userUpdated = await userService.uploadAvatar(req.user, avatar)

  res.send({
    status: 1,
    results: {
      user: userUpdated
    }
  })
}

module.exports = {
  signup,
  login,
  logout,
  logoutAllDevice,
  getInfoUser,
  updateInfoUser,
  uploadAvatar
}
