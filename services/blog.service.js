const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const {
  addBlogDb,
  getAllBlogsDb
} = require('../db/blog.db')

const addBlog = async (body, files) => {
  const { image } = files
  const imageLink = await uploadImage(image, '/images/blogs')

  const blog = {
    ...body,
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

module.exports = {
  addBlog,
  getAllBlogs
}
