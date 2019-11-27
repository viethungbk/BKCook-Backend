const express = require('express')

const asyncWrap = require('../middlewares/asyncWrap')
const router = express.Router()
const {
  addRecipeBasicInfo,
  addRecipeMaterial
} = require('../controllers/recipe.controller')
const {
  auth
} = require('../middlewares/auth')

router.post('/basic-info', auth, asyncWrap(addRecipeBasicInfo))
router.post('/materials', auth, asyncWrap(addRecipeMaterial))

module.exports = router
