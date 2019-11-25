const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addCookingClass
} = require('../controllers/cookingClass.controller')

router.post('/', asyncWrap(addCookingClass))

module.exports = router
