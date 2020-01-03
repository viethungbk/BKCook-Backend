const mongoose = require('mongoose')
const { postStatus } = require('../configs/config')

const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: Number,
    default: postStatus.NOT_APPROVED
  },
  image: {
    type: String,
    trim: true,
    required: true
  },
  idUser: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }]
})

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel
