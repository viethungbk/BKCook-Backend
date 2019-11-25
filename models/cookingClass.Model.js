const mongoose = require('mongoose')

const cookingClassSchema = new mongoose.Schema({
  className: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  shortDescription: {
    type: String,
    trim: true,
    required: true
  },
  startTime: {
    type: String,
    trim: true
  },
  endTime: {
    type: String,
    trim: true
  },
  classDescription: {
    type: String,
    trim: true
  },
  tutorDescription: {
    type: String,
    trim: true
  }
})

const cookingClassModel = mongoose.model('CookingClass', cookingClassSchema)

module.exports = cookingClassModel
