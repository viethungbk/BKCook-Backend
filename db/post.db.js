const Post = require('../models/post.model')
const { pagination } = require('../configs/config')

const addPostDb = async (post) => {
  const newPost = new Post({
    ...post
  })

  const rs = await newPost.save()
  return rs
}

const getAllPostsDb = async (query) => {
  let { page, records } = query
  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)
  const totalRecords = await Post.countDocuments()

  const posts = await Post.find({})
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    posts
  }
}

module.exports = {
  addPostDb,
  getAllPostsDb
}
