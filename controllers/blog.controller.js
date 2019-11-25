const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const blogService = require('../services/blog.service')

const addBlog = async (req, res) => {
  const { body, files } = req
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

  const rs = await blogService.addBlog(body, files)

  res.send(rs)
}

module.exports = {
  addBlog
}
