const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const commentSchema = new mongoose.Schema({
  idRecipe: {
    type: ObjectId,
    ref: 'Recipe',
    required: true
  },
  comments: [
    {
      idUser: {
        type: ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        trim: true
      },
      dateCreated: {
        type: Date,
        default: Date.now()
      }
    }
  ]
})

const commentModel = mongoose.model('Comment', commentSchema)

module.exports = commentModel
