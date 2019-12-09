const mongoose = require('mongoose')

const { recipeStatus, recipeLevel } = require('../configs/config')

const recipeSchema = mongoose.Schema({
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
    default: recipeStatus.EASY
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
  }
})

const recipeModel = mongoose.model('Recipe', recipeSchema)

module.exports = recipeModel
