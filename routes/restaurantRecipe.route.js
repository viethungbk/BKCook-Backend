const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addRestaurantRecipe,
  getAllRestaurantRecipes,
  getRecipeById,
  deleteRecipeById
} = require('../controllers/restaurantRecipe.controller')

router.post('/', asyncWrap(addRestaurantRecipe))
router.get('/', asyncWrap(getAllRestaurantRecipes))
router.get('/recipe', asyncWrap(getRecipeById))
router.delete('/recipe', asyncWrap(deleteRecipeById))

module.exports = router
