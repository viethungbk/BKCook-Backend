const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addRestaurantRecipe,
  getAllRestaurantRecipes
} = require('../controllers/restaurantRecipe.controller')

router.post('/', asyncWrap(addRestaurantRecipe))
router.get('/', asyncWrap(getAllRestaurantRecipes))

module.exports = router
