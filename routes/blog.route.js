const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  searchBlog,
  getTotalBlog
} = require('../controllers/blog.controller')
const { authAdmin } = require('../middlewares/auth')

router.post('/', authAdmin, asyncWrap(addBlog))
router.get('/', asyncWrap(getAllBlogs))
router.get('/id', asyncWrap(getBlogById))
router.delete('/id', authAdmin, asyncWrap(deleteBlogById))
router.get('/search', asyncWrap(searchBlog))
router.get('/total', asyncWrap(getTotalBlog))

module.exports = router
