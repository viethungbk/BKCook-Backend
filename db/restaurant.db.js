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

const getAllRestaurantsDb = async () => {
  const restaurants = await Restaurant.find({})
  return restaurants
}

module.exports = {
  getRestaurantByEmail,
  signUpDb,
  getAllRestaurantsDb
}
