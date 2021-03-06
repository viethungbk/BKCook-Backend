const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const { authRestaurant } = require('../middlewares/authRestaurant')
const {
  signUp,
  login,
  logout,
  getInfo,
  getAllRestaurants
} = require('../controllers/restaurant.controller')

router.post('/signup', asyncWrap(signUp))
router.post('/login', asyncWrap(login))
router.post('/logout', authRestaurant, asyncWrap(logout))
router.get('/', authRestaurant, asyncWrap(getInfo))
router.get('/all', asyncWrap(getAllRestaurants))

module.exports = router
