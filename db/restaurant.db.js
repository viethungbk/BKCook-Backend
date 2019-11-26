const Restaurant = require('../models/restaurant.model')

const getRestaurantByEmail = async (email) => {
  const restaurant = await Restaurant.findOne({ email })
  return restaurant
}

const signUpDb = async (restaurant) => {
  const newRestaurant = await Restaurant.create(restaurant)
  const token = await newRestaurant.generateAuthToken()

  return {
    newRestaurant,
    token
  }
}

module.exports = {
  getRestaurantByEmail,
  signUpDb
}
