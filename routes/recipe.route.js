const express = require('express')

const asyncWrap = require('../middlewares/asyncWrap')
const router = express.Router()
const { addRecipe } = require('../controllers/recipe.controller')

router.post('/', asyncWrap(addRecipe))

module.exports = router
