const express = require('express')

const router = express.Router()
const asyncWrap = require('../middlewares/asyncWrap')
const {
  addPost,
  getAllPosts
} = require('../controllers/post.controller')

router.post('/', asyncWrap(addPost))
router.get('/', asyncWrap(getAllPosts))

module.exports = router
