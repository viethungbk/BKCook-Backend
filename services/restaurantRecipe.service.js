const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const {
  addRestaurantRecipeDb,
  getAllRestaurantRecipesDb
} = require('../db/restaurantRecipe.db')

const addRestaurantRecipe = async (body, files) => {
  const { image } = files
  const imageLink = await uploadImage(image, '/images/RestaurantRecipes')

  const restaurantRecipe = {
    ...body,
    image: imageLink
  }

  const data = await addRestaurantRecipeDb(restaurantRecipe)

  if (!data) {
    throw new Error('Không thể thêm món ăn cho nhà hàng')
  }
  return new ResponseResult(true, data)
}

const getAllBlogs = async (query) => {
  const data = await getAllRestaurantRecipesDb(query)
  if (!data) {
    throw new Error('Không thể lấy món ăn của nhà hàng')
  }
  return new ResponseResult(true, data)
}

module.exports = {
  addRestaurantRecipe,
  getAllBlogs
}
