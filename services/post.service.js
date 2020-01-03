const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const {
  addPostDb,
  getAllPostsDb
} = require('../db/post.db')

const addPost = async (body, files) => {
  const { image } = files
  const imageLink = await uploadImage(image, '/images/posts')

  const post = {
    ...body,
    image: imageLink
  }

  const data = await addPostDb(post)

  if (!data) {
    throw new Error('Không thể thêm bài đăng')
  }
  return new ResponseResult(true, data)
}

const getAllPosts = async (query) => {
  const data = await getAllPostsDb(query)
  if (!data) {
    throw new Error('Không thể lấy bài đăng')
  }
  return new ResponseResult(true, data)
}

module.exports = {
  addPost,
  getAllPosts
}
