const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addCookingClass,
  getAllCookingClasses
} = require('../controllers/cookingClass.controller')

router.post('/', asyncWrap(addCookingClass))
router.get('/', asyncWrap(getAllCookingClasses))

module.exports = router
