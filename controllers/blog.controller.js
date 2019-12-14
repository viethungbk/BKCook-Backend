const validator = require('validator')

const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const blogService = require('../services/blog.service')

const addBlog = async (req, res) => {
  const { user, body, files } = req
  const { title, content } = body

  if (!title) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập tiêu đề bài viết')
  }
  if (!content) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập nội dung bài viết')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho bài viết')
  }

  const rs = await blogService.addBlog(user, body, files)
  res.send(rs)
}

const getAllBlogs = async (req, res) => {
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

  const rs = await blogService.getAllBlogs(query)
  res.send(rs)
}

const getBlogById = async (req, res) => {
  const { query } = req
  const { id } = query

  if (!id) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập id của blog')
  }

  const rs = await blogService.getBlogById(query)
  res.send(rs)
}

const deleteBlogById = async (req, res) => {
  const { body } = req
  const { id } = body

  if (!id) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập id của blog')
  }

  const rs = await blogService.deleteBlogById(body)
  res.send(rs)
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById
}
