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
  changeRecipeStatus
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

module.exports = router
