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

  body.idUser = user._id

  const rs = await recipeService.addRecipeBasicInfo(body, files)

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

module.exports = {
  addRecipeBasicInfo,
  addRecipeMaterials,
  addRecipeStep
}
