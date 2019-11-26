const RestaurantRecipe = require('../models/restaurantRecipe.model')
const { pagination } = require('../configs/config')

const addRestaurantRecipeDb = async (restaurantRecipe) => {
  const newRestaurantRecipe = new RestaurantRecipe({
    ...restaurantRecipe
  })

  const rs = await newRestaurantRecipe.save()
  return rs
}

const getAllRestaurantRecipesDb = async (query) => {
  let { page, records, restaurant } = query
  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)
  const totalRecords = await RestaurantRecipe.findById(restaurant).count()

  const blogs = await RestaurantRecipe.findById(restaurant)
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    blogs
  }
}

module.exports = {
  addRestaurantRecipeDb,
  getAllRestaurantRecipesDb
}
