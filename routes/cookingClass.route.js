const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const { authRestaurant } = require('../middlewares/authRestaurant')
const {
  addCookingClass,
  getAllCookingClasses
} = require('../controllers/cookingClass.controller')

router.post('/', authRestaurant, asyncWrap(addCookingClass))
router.get('/', asyncWrap(getAllCookingClasses))

module.exports = router
