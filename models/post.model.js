const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  status: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    trim: true
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
