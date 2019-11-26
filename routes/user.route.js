const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  auth,
  looseAuth
} = require('../middlewares/auth')
const {
  signup,
  login,
  logout,
  logoutAllDevice,
  getInfoUser,
  updateInfoUser,
  uploadAvatar
} = require('../controllers/user.controller')

router.post('/signup', looseAuth, asyncWrap(signup))
router.post('/login', asyncWrap(login))
router.post('/logout', auth, asyncWrap(logout))
router.post('/logout-all', auth, asyncWrap(logoutAllDevice))
router.get('/', auth, asyncWrap(getInfoUser))
router.patch('/', auth, asyncWrap(updateInfoUser))
router.patch('/upload-avatar', auth, asyncWrap(uploadAvatar))

module.exports = router
