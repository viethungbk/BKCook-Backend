const validator = require('validator')

const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')

const recipeService = require('../services/recipe.service')

const addRecipeBasicInfo = async (req, res) => {
  const { body, files } = req
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

  const rs = await recipeService.addRecipeBasicInfo(body, files)

  res.send(rs)
}

module.exports = {
  addRecipeBasicInfo
}
