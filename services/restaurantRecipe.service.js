const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const {
  addRestaurantRecipeDb,
  getAllRestaurantRecipesDb,
  getRecipeByIdDb,
  deleteRecipeByIdDb
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

const getAllRestaurantRecipes = async (query) => {
  const data = await getAllRestaurantRecipesDb(query)
  if (!data) {
    throw new Error('Không thể lấy món ăn của nhà hàng')
  }
  return new ResponseResult(true, data)
}

const getRecipeById = async (query) => {
  const data = await getRecipeByIdDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, 'Món ăn không tồn tại')
  }
  return new ResponseResult(true, data)
}

const deleteRecipeById = async (query) => {
  const rs = await deleteRecipeByIdDb(query)
  if (!rs) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Món ăn không tồn tại')
  }
  return new ResponseResult(true, {})
}

module.exports = {
  addRestaurantRecipe,
  getAllRestaurantRecipes,
  getRecipeById,
  deleteRecipeById
}
