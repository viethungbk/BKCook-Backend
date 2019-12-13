const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  },
  video: {
    type: String,
    trim: true
  }
})

const blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel
