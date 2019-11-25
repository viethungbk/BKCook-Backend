const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const restaurantRecipeSchema = new mongoose.Schema({
  idRestaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  }
})

const restaurantRecipeModel = mongoose.model('RestaurantRecipe', restaurantRecipeSchema)

module.exports = restaurantRecipeModel
