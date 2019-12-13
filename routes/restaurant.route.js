const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  signUp
} = require('../controllers/restaurant.controller')

router.post('/', asyncWrap(signUp))

module.exports = router
