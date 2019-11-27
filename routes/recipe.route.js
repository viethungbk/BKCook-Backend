const express = require('express')

const asyncWrap = require('../middlewares/asyncWrap')
const router = express.Router()
const { addRecipeBasicInfo } = require('../controllers/recipe.controller')

router.post('/basic-info', asyncWrap(addRecipeBasicInfo))

module.exports = router
