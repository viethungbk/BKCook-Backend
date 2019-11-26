const validator = require('validator')

const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const restaurantRecipeService = require('../services/restaurantRecipe.service')

const addRestaurantRecipe = async (req, res) => {
  const { body, files } = req
  const { idRestaurant, title, description, price } = body

  if (!idRestaurant) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRestaurant là bắt buộc')
  }
  if (!title) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập tên món ăn')
  }
  if (!description) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập mô tả cho món ăn')
  }
  if (!price) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập giá món ăn')
  }
  if (!validator.isNumeric(price)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Giá cho món ăn phải là số')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho món ăn')
  }

  const rs = await restaurantRecipeService.addRestaurantRecipe(body, files)
  res.send(rs)
}

const getAllRestaurantRecipes = async (req, res) => {
  const { query } = req
  const { page, records, restaurant } = query

  if (page) {
    if (!validator.isNumeric(page)) {
      throw new CustomError(errorCode.BAD_REQUEST, 'page phải là môt số')
    }
  }
  if (records) {
    if (!validator.isNumeric(records)) {
      throw new CustomError(errorCode.BAD_REQUEST, 'records phải là một số')
    }
  }
  if (!restaurant) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm id của nhà hàng')
  }

  const rs = await restaurantRecipeService.getAllRestaurantRecipes(query)
  res.send(rs)
}

module.exports = {
  addRestaurantRecipe,
  getAllRestaurantRecipes
}
