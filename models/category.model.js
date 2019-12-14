const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel
