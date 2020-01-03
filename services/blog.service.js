const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const {
  addBlogDb,
  getAllBlogsDb,
  getBlogByIdDb,
  deleteBlogByIdDb,
  searchBlogDb,
  getTotalBlogDb,
  editBlogDb
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

const searchBlog = async (query) => {
  const { key } = query
  const data = await searchBlogDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, `Không tìm thấy bài viết cho từ khoá: ${key}`)
  }
  if (data.blogs) {
    if (data.blogs.length === 0) {
      throw new CustomError(errorCode.NOT_FOUND, `Không tìm thấy bài viết cho từ khoá: ${key}`)
    }
  }
  return new ResponseResult(true, data)
}

const getTotalBlog = async () => {
  const data = await getTotalBlogDb()
  if (!data) {
    throw new Error('Không thể lấy tổng số blogs')
  }
  return new ResponseResult(true, data)
}

const editBlog = async (body, files) => {
  const { image } = files
  const { idBlog, title, content, video } = body

  const blog = {}
  if (image) {
    const imageLink = await uploadImage(image, '/images/blogs')
    blog.image = imageLink
  }
  if (title) {
    blog.title = title
  }
  if (content) {
    blog.content = content
  }
  if (video) {
    blog.video = video
  }

  const data = await editBlogDb(idBlog, blog)

  if (!data) {
    throw new Error('Không thể sửa blog')
  }
  return new ResponseResult(true, data)
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  searchBlog,
  getTotalBlog,
  editBlog
}
