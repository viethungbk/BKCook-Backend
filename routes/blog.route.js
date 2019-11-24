const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const { addBlog } = require('../controllers/blog.controller')

router.post('/', asyncWrap(addBlog))

module.exports = router
