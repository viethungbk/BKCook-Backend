const validator = require('validator')

const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const {
  addRecipeBasicInfoDb,
  finishAddingRecipeDb,
  addRecipeCateDb,
  getRecipeByIdDb,
  changeRecipeStatusDb,
  deleteRecipeByIdDb,
  searchRecipeDb,
  filterRecipeDb,
  getReadyRecipeDb,
  getRelateRecipeDb,
  getTotalRecipeDb,
  getRecommendRestaurantsDb
} = require('../db/recipe.db')
const { addStepDb } = require('../db/step.db')
const { addMaterialsDb } = require('../db/material.db')

const addRecipeBasicInfo = async (body, files, user) => {
  const { image } = files

  const imageLink = await uploadImage(image, 'images/recipes')

  const recipe = {
    ...body,
    idUser: user._id,
    image: imageLink
  }

  const rs = await addRecipeBasicInfoDb(recipe)
  return new ResponseResult(true, rs)
}

const addRecipeMaterials = async (body) => {
  const { materials } = body
  const length = materials.length

  for (let i = 0; i < length; i++) {
    const material = materials[i]
    if (typeof material !== 'object') {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải là Object`)
    }
    if (!('name' in material)) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có name`)
    }
    if (!('unit' in material)) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có unit`)
    }
    if (!('quantitative' in material)) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có quantitative`)
    }
    if (!validator.isNumeric(material.quantitative.toString())) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có quantitative là một số`)
    }
  }

  const rs = await addMaterialsDb(body)
  return new ResponseResult(true, rs)
}

const addRecipeStep = async (body, files) => {
  const { image } = files

  const imageLink = await uploadImage(image, 'images/steps')

  const data = {
    ...body,
    image: imageLink
  }

  const rs = await addStepDb(data)
  return new ResponseResult(true, rs)
}

const finishAddingRecipe = async (body, user) => {
  const data = await finishAddingRecipeDb(body, user)
  if (!data) {
    throw new Error('Không thể thay đổi trạng thái của công thức')
  }
  return new ResponseResult(true, data)
}

const addRecipeCate = async (body) => {
  const data = await addRecipeCateDb(body)
  if (!data) {
    throw new Error('Không thể thêm cate cho công thức')
  }
  return new ResponseResult(true, data)
}

const getRecipeById = async (query) => {
  const { idRecipe } = query
  const data = await getRecipeByIdDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, `Không tìm thấy công thức ${idRecipe}`)
  }
  return new ResponseResult(true, data)
}

const changeRecipeStatus = async (body) => {
  const data = await changeRecipeStatusDb(body)
  if (!data) {
    throw new Error('Không thể lấy thay đổi trạng thái của công thức')
  }
  return new ResponseResult(true, data)
}

const deleteRecipeById = async (body) => {
  const data = await deleteRecipeByIdDb(body)
  if (!data) {
    throw new Error('Không thể xoá công thức')
  }
  return new ResponseResult(true, {
    data: 'Xoá thành công công thức'
  })
}

const searchRecipe = async (query) => {
  const { key } = query
  const data = await searchRecipeDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, `Không tìm thấy công thức cho từ khoá: ${key}`)
  }
  return new ResponseResult(true, data)
}

const filterRecipe = async (query) => {
  const data = await filterRecipeDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, 'Không tìm thấy công thức')
  }
  return new ResponseResult(true, data)
}

const getReadyRecipe = async () => {
  const data = await getReadyRecipeDb()
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, 'Không có công thức nào cần duyệt')
  }
  return new ResponseResult(true, data)
}

const getRelateRecipe = async (query) => {
  const data = await getRelateRecipeDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, 'Không có công thức nào liên quan')
  }
  return new ResponseResult(true, data)
}

const getTotalRecipe = async () => {
  const data = await getTotalRecipeDb()
  if (!data) {
    throw new CustomError(errorCode.INTERNAL_SERVER_ERROR, 'Không thể lấy tổng công thức')
  }
  return new ResponseResult(true, data)
}

const getRecommendRestaurants = async (query) => {
  const data = await getRecommendRestaurantsDb(query)
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, 'Không tìm thấy nhà hàng có món ăn này')
  }
  return new ResponseResult(true, data)
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
  getTotalRecipe,
  getRecommendRestaurants
}
