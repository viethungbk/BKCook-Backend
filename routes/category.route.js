const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addCategory,
  getAllCategories,
  deleteCategoryById
} = require('../controllers/category.controller')
const { authAdmin } = require('../middlewares/auth')

router.post('/', authAdmin, asyncWrap(addCategory))
router.get('/', asyncWrap(getAllCategories))
router.delete('/id', authAdmin, asyncWrap(deleteCategoryById))

module.exports = router
