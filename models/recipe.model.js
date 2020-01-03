const mongoose = require('mongoose')

const { recipeStatus, recipeLevel } = require('../configs/config')
const { ObjectId } = mongoose.Schema.Types

const recipeSchema = mongoose.Schema({
  idUser: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  linkVideo: {
    type: String,
    trim: true
  },
  level: {
    type: Number,
    default: recipeLevel.EASY
  },
  time: {
    type: Number
  },
  image: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  typeRecipe: [{
    type: String,
    trim: true
  }],
  countryCuisine: {
    type: String,
    trim: true
  },
  typeOfDish: [{
    type: String,
    trim: true
  }],
  processingMethod: [{
    type: String,
    trim: true
  }],
  season: {
    type: String,
    trim: true
  },
  purpose: [{
    type: String,
    trim: true
  }],
  ratingStar: {
    type: Number
  },
  status: {
    type: Number,
    default: recipeStatus.INIT
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  nutrition: [{
    type: String,
    trim: true
  }],
  calories: {
    type: Number
  },
  view: {
    type: Number,
    default: 0
  }
})

const recipeModel = mongoose.model('Recipe', recipeSchema)

module.exports = recipeModel
