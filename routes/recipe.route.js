const express = require('express')

const asyncWrap = require('../middlewares/asyncWrap')
const router = express.Router()
const {
  addRecipeBasicInfo,
  addRecipeMaterials,
  addRecipeStep
} = require('../controllers/recipe.controller')
const {
  auth
} = require('../middlewares/auth')

router.post('/basic-info', auth, asyncWrap(addRecipeBasicInfo))
router.post('/materials', auth, asyncWrap(addRecipeMaterials))
router.post('/steps', auth, asyncWrap(addRecipeStep))

module.exports = router
