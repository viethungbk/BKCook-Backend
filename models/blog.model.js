const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const blogSchema = new mongoose.Schema({
  idUser: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
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
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})

const blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel
