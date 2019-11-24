const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const savedRecipeSchema = new mongoose.Schema({
  idUser: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  savedRecipe: [
    {
      type: ObjectId,
      ref: 'Recipe'
    }
  ]
})

const savedRecipeModel = mongoose.model('SavedRecipe', savedRecipeSchema)

module.exports = savedRecipeModel
