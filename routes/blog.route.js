const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addBlog,
  getAllBlogs
} = require('../controllers/blog.controller')

router.post('/', asyncWrap(addBlog))
router.get('/', asyncWrap(getAllBlogs))

module.exports = router
