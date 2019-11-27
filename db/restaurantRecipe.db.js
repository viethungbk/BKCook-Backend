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
  const totalRecords = await RestaurantRecipe.countDocuments({ idRestaurant: restaurant })

  const restaurantRecipes = await RestaurantRecipe.find({ idRestaurant: restaurant })
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    restaurantRecipes
  }
}

const getRecipeByIdDb = async (query) => {
  const { id } = query
  const recipe = await RestaurantRecipe.findById(id)

  return recipe
}

const deleteRecipeByIdDb = async (query) => {
  const { id } = query
  const rs = await RestaurantRecipe.findByIdAndDelete(id)
  return rs
}

module.exports = {
  addRestaurantRecipeDb,
  getAllRestaurantRecipesDb,
  getRecipeByIdDb,
  deleteRecipeByIdDb
}
