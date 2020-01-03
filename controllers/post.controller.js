const validator = require('validator')

const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const postService = require('../services/post.service')

const addPost = async (req, res) => {
  const { body, files } = req
  const { content } = body

  if (!content) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập nội dung bài đăng')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho bài đăng')
  }

  const rs = await postService.addPost(body, files)
  res.send(rs)
}

const getAllPosts = async (req, res) => {
  const { query } = req
  const { page, records } = query

  if (page) {
    if (!validator.isNumeric(page)) {
      throw new CustomError(errorCode.BAD_REQUEST, 'page phải là môt số')
    }
  }
  if (records) {
    if (!validator.isNumeric(records)) {
      throw new CustomError(errorCode.BAD_REQUEST, 'records phải là một số')
    }
  }

  const rs = await postService.getAllPosts(query)
  res.send(rs)
}

module.exports = {
  addPost,
  getAllPosts
}
