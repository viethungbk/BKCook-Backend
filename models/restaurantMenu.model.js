const mongoose = require('mongoose')

const restaurantMenuSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  recipes: [{
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number
    },
    image: {
      type: String,
      trim: true
    }
  }]
})

const restaurantMenuModel = mongoose.model('RestaurantMenu', restaurantMenuSchema)

module.exports = restaurantMenuModel
