const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const {
  addBlogDb,
  getAllBlogsDb,
  getBlogByIdDb,
  deleteBlogByIdDb
} = require('../db/blog.db')

const addBlog = async (user, body, files) => {
  const { image } = files
  const imageLink = await uploadImage(image, '/images/blogs')

  const blog = {
    ...body,
    idUser: user._id,
    image: imageLink
  }

  const data = await addBlogDb(blog)

  if (!data) {
    throw new Error('Không thể thêm blog')
  }
  return new ResponseResult(true, data)
}

const getAllBlogs = async (query) => {
  const data = await getAllBlogsDb(query)
  if (!data) {
    throw new Error('Không thể lấy blogs')
  }
  return new ResponseResult(true, data)
}

const getBlogById = async (query) => {
  const data = await getBlogByIdDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, 'Không tìm thấy blog')
  }
  return new ResponseResult(true, data)
}

const deleteBlogById = async (body) => {
  const { id } = body
  const data = await deleteBlogByIdDb(body)
  if (!data) {
    throw new Error(`Không thể xoá blog: ${id}`)
  }
  return new ResponseResult(true, data)
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById
}
