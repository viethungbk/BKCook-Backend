const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
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
  time: {
    type: Number
  },
  otherMaterial: {
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
    type: Number
  },
  category: [{
    type: String,
    trim: true
  }],
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  nutrition: [{
    type: String,
    trim: true
  }],
  calo: {
    type: Number
  }
})

const recipeModel = mongoose.model('Recipe', recipeSchema)

module.exports = recipeModel
