const Blog = require('../models/blog.model')
const { pagination } = require('../configs/config')

const addBlogDb = async (blog) => {
  const newBlog = new Blog({
    ...blog
  })

  const rs = await newBlog.save()
  return rs
}

const getAllBlogsDb = async (query) => {
  let { page, records } = query
  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)
  const totalRecords = await Blog.countDocuments()

  const blogs = await Blog.find({})
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    blogs
  }
}

module.exports = {
  addBlogDb,
  getAllBlogsDb
}
