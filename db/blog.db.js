const Blog = require('../models/blog.model')

const addBlogDb = async (blog) => {
  const newBlog = new Blog({
    ...blog
  })

  const rs = await newBlog.save()

  return rs
}

module.exports = {
  addBlogDb
}
