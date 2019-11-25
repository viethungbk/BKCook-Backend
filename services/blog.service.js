const uploadImage = require('../utils/uploadImage')
const { addBlogDb } = require('../db/blog.db')
const { ResponseResult } = require('../configs/config')

const addBlog = async (body, files) => {
  const { image } = files
  const imageLink = await uploadImage(image, '/images/blogs')

  const blog = {
    ...body,
    image: imageLink
  }

  const rs = await addBlogDb(blog)

  if (!rs) {
    throw new Error('Không thể thêm blog')
  }
  return new ResponseResult(true, rs)
}

module.exports = {
  addBlog
}
