const express = require('express')

const asyncWrap = require('../middlewares/asyncWrap')
const router = express.Router()
const {
  addRecipeBasicInfo,
  addRecipeMaterials,
  addRecipeStep,
  finishAddingRecipe,
  addRecipeCate,
  getRecipeById
} = require('../controllers/recipe.controller')
const {
  auth
} = require('../middlewares/auth')

router.post('/basic-info', auth, asyncWrap(addRecipeBasicInfo))
router.post('/materials', auth, asyncWrap(addRecipeMaterials))
router.post('/steps', auth, asyncWrap(addRecipeStep))
router.post('/', auth, asyncWrap(finishAddingRecipe))
router.post('/cate', auth, asyncWrap(addRecipeCate))
router.get('/id', asyncWrap(getRecipeById))

module.exports = router
