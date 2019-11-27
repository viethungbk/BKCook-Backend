const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')

const recipeService = require('../services/recipe.service')

const addRecipeBasicInfo = async (req, res) => {
  const { body, files } = req
  const { title } = body

  if (!title) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập tên công thức')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập ảnh cho công thức')
  }

  await recipeService.addRecipeBasicInfo(body, files)

  res.send({
    status: 1
  })
}

module.exports = {
  addRecipeBasicInfo
}
