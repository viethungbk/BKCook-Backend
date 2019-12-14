const express = require('express')

const asyncWrap = require('../middlewares/asyncWrap')
const router = express.Router()
const {
  addRecipeBasicInfo,
  addRecipeMaterials,
  addRecipeStep,
  finishAddingRecipe,
  addRecipeCate,
  getRecipeById,
  changeRecipeStatus,
  deleteRecipeById,
  searchRecipe,
  filterRecipe,
  getReadyRecipe,
  getRelateRecipe,
  getRelateClass,
  getRelateRestaurant
} = require('../controllers/recipe.controller')
const {
  auth,
  authAdmin
} = require('../middlewares/auth')

router.post('/basic-info', auth, asyncWrap(addRecipeBasicInfo))
router.post('/materials', auth, asyncWrap(addRecipeMaterials))
router.post('/steps', auth, asyncWrap(addRecipeStep))
router.post('/', auth, asyncWrap(finishAddingRecipe))
router.post('/cate', auth, asyncWrap(addRecipeCate))
router.get('/id', asyncWrap(getRecipeById))
router.post('/status', authAdmin, asyncWrap(changeRecipeStatus))
router.delete('/id', authAdmin, asyncWrap(deleteRecipeById))
router.get('/search', asyncWrap(searchRecipe))
router.get('/filter', asyncWrap(filterRecipe))
router.get('/ready', authAdmin, asyncWrap(getReadyRecipe))

router.get('/relate-recipe', asyncWrap(getRelateRecipe))
router.get('/relate-class', asyncWrap(getRelateClass))
router.get('/relate-restaurant', asyncWrap(getRelateRestaurant))

module.exports = router
