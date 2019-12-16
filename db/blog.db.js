const Blog = require('../models/blog.model')
const { pagination } = require('../configs/config')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')

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

const getBlogByIdDb = async (query) => {
  const { id } = query

  let blog = await Blog.findById(id)
  if (!blog) {
    return null
  }
  blog.views += 1
  blog = await blog.save()

  return blog
}

const deleteBlogByIdDb = async (body) => {
  const { id } = body

  const rs = await Blog.findByIdAndRemove(id)
  return rs
}

const searchBlogDb = async (query) => {
  let { key, page, records } = query
  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)

  const regExp = new RegExp(key, 'i')

  const totalRecords = await Blog.countDocuments({
    title: regExp
  })

  const blogs = await Blog
    .find({
      title: regExp
    })
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    blogs
  }
}

const getTotalBlogDb = async () => {
  const total = await Blog.countDocuments({})
  return total
}

const editBlogDb = async (idBlog, blog) => {
  const editBlog = await Blog.findById(idBlog)
  const { image, title, content, video } = blog

  if (!editBlog) {
    throw new CustomError(errorCode.NOT_FOUND, `Không tìm thấy blog có id: ${idBlog}`)
  }

  if (image) {
    editBlog.image = image
  }
  if (title) {
    editBlog.title = title
  }
  if (content) {
    editBlog.content = content
  }
  if (video) {
    editBlog.video = video
  }

  const result = await editBlog.save()
  return result
}

module.exports = {
  addBlogDb,
  getAllBlogsDb,
  getBlogByIdDb,
  deleteBlogByIdDb,
  searchBlogDb,
  getTotalBlogDb,
  editBlogDb
}
