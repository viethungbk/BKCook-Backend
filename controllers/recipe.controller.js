const validator = require('validator')

const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')

const recipeService = require('../services/recipe.service')

const addRecipeBasicInfo = async (req, res) => {
  const { body, files, user } = req
  const { title, shortDescription, level, time } = body

  if (!title) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập tên công thức')
  }
  if (!shortDescription) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập mô tả cho công thức')
  }
  if (!level) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập độ khó khi thực hiện công thức')
  }
  if (!time) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập khoảng thời gian thực hiện món ăn')
  }
  if (!validator.isNumeric(time)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Thời gian thực hiện món ăn phải là một số')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho công thức')
  }

  const rs = await recipeService.addRecipeBasicInfo(body, files, user)

  res.send(rs)
}

const addRecipeMaterials = async (req, res) => {
  const { body } = req
  const { idRecipe, materials } = body

  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }
  if (!materials) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập các nguyên liệu cho công thức')
  }
  if (!Array.isArray(materials) || materials.length === 0) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Danh sách nguyên liệu phải là một mảng khác rỗng')
  }

  const rs = await recipeService.addRecipeMaterials(body)
  res.send(rs)
}

const addRecipeStep = async (req, res) => {
  const { body, files } = req
  const { idRecipe, stepNumber, description } = body

  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }
  if (!stepNumber) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập số thứ tự của bước thực hiện')
  }
  if (!description) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập mô tả cho bước thực hiện')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho bước thực hiện')
  }

  const rs = await recipeService.addRecipeStep(body, files)
  res.send(rs)
}

const finishAddingRecipe = async (req, res) => {
  const { body, user } = req
  const { idRecipe } = body
  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }

  const rs = await recipeService.finishAddingRecipe(body, user)
  res.send(rs)
}

const addRecipeCate = async (req, res) => {
  const { body } = req
  const { idRecipe, typeRecipe, countryCuisine, processingMethod, purpose, tags } = body

  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }
  // Công thức
  if (!typeRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'typeRecipe là bắt buộc')
  }
  if (!Array.isArray(typeRecipe) || typeRecipe.length === 0) {
    throw new CustomError(errorCode.BAD_REQUEST, 'typeRecipe là một mảng khác rỗng')
  }
  // Ẩm thực của quốc gia nào?
  if (!countryCuisine) {
    throw new CustomError(errorCode.BAD_REQUEST, 'countryCuisine là bắt buộc')
  }
  // Cách thức thực hiện
  if (!processingMethod) {
    throw new CustomError(errorCode.BAD_REQUEST, 'processingMethod là bắt buộc')
  }
  if (!Array.isArray(processingMethod) || processingMethod.length === 0) {
    throw new CustomError(errorCode.BAD_REQUEST, 'processingMethod là một mảng khác rỗng')
  }
  // Mục đích
  if (!purpose) {
    throw new CustomError(errorCode.BAD_REQUEST, 'purpose là bắt buộc')
  }
  if (!Array.isArray(purpose) || purpose.length === 0) {
    throw new CustomError(errorCode.BAD_REQUEST, 'purpose là một mảng khác rỗng')
  }
  if (!tags) {
    throw new CustomError(errorCode.BAD_REQUEST, 'tags là bắt buộc')
  }
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new CustomError(errorCode.BAD_REQUEST, 'tags là một mảng khác rỗng')
  }

  const rs = await recipeService.addRecipeCate(body)
  res.send(rs)
}

const getRecipeById = async (req, res) => {
  const { query } = req
  const { idRecipe } = query
  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }

  const rs = await recipeService.getRecipeById(query)
  res.send(rs)
}

const changeRecipeStatus = async (req, res) => {
  const { body } = req
  const { idRecipe, status } = body

  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }
  if (!status) {
    throw new CustomError(errorCode.BAD_REQUEST, 'status là bắt buộc')
  }
  if (!validator.isNumeric(status.toString())) {
    throw new CustomError(errorCode.BAD_REQUEST, 'status phải là một số')
  }
  if (status < -1 || status > 2) {
    throw new CustomError(errorCode.BAD_REQUEST,
      'status chỉ nhận các giá trị: -1(NOT_APPROVED), 0(INT), 1(READY), 2(APPROVED)')
  }

  const rs = await recipeService.changeRecipeStatus(body)
  res.send(rs)
}

const deleteRecipeById = async (req, res) => {
  const { body } = req
  const { idRecipe } = body

  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }

  const rs = await recipeService.deleteRecipeById(body)
  res.send(rs)
}

const searchRecipe = async (req, res) => {
  const { query } = req

  if (!query) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập các trường thông tin để tìm kiếm: key, page, records')
  }

  const { key, page, records } = query
  if (!key) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập từ khoá để tìm kiếm')
  }

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

  const rs = await recipeService.searchRecipe(query)
  res.send(rs)
}

const filterRecipe = async (req, res) => {
  const { query } = req

  if (!query) {
    throw new CustomError(errorCode.BAD_REQUEST,
      'Hãy nhập các trường thông tin để tìm lọc: level, tags, typeRecipe, countryCuisine, typeOfDish, processingMethod, season, purpose')
  }

  const { level, page, records } = query
  if (page) {
    if (!validator.isNumeric(page)) {
      throw new CustomError(errorCode.BAD_REQUEST, 'page phải là môt số')
    }
  }
  if (level) {
    if (!validator.isNumeric(level)) {
      throw new CustomError(errorCode.BAD_REQUEST, 'level phải là môt số')
    }
  }
  if (records) {
    if (!validator.isNumeric(records)) {
      throw new CustomError(errorCode.BAD_REQUEST, 'records phải là một số')
    }
  }

  const rs = await recipeService.filterRecipe(query)
  res.send(rs)
}

const getReadyRecipe = async (req, res) => {
  const rs = await recipeService.getReadyRecipe()
  res.send(rs)
}

const getRelateRecipe = async (req, res) => {
  const { query } = req
  const { idRecipe, page, records } = query

  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }
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

  const rs = await recipeService.getRelateRecipe(query)
  res.send(rs)
}

const getRelateClass = async (req, res) => {
  res.send(1)
}

const getRelateRestaurant = async (req, res) => {
  res.send(1)
}

const getTotalRecipe = async (req, res) => {
  const rs = await recipeService.getTotalRecipe()
  res.send(rs)
}

const getRecommendRestaurants = async (req, res) => {
  const { query } = req
  const { idRecipe, page, records } = query

  if (!idRecipe) {
    throw new CustomError(errorCode.BAD_REQUEST, 'idRecipe là bắt buộc')
  }
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

  const rs = await recipeService.getRecommendRestaurants(query)
  res.send(rs)
}

module.exports = {
  addRecipeBasicInfo,
  addRecipeMaterials,
  addRecipeStep,
  finishAddingRecipe,
  addRecipeCate,
  getRecipeById,
  changeRecipeStatus,
  deleteRecipeById,
  searchRecipe,
  filterRecipe,
  getReadyRecipe,
  getRelateRecipe,
  getRelateClass,
  getRelateRestaurant,
  getTotalRecipe,
  getRecommendRestaurants
}
