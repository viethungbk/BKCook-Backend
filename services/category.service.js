const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const {
  addCategoryDb,
  getAllCategoriesDb,
  deleteCategoryByIdDb
} = require('../db/category.db')

const addCategory = async (body, files) => {
  const { image } = files
  const imageLink = await uploadImage(image, '/images/categories')

  const category = {
    ...body,
    image: imageLink
  }

  const data = await addCategoryDb(category)

  if (!data) {
    throw new Error('Không thể thêm category')
  }
  return new ResponseResult(true, data)
}

const getAllCategories = async () => {
  const data = await getAllCategoriesDb()
  if (!data) {
    throw new CustomError(errorCode.NOT_FOUND, 'Không có category')
  }
  return new ResponseResult(true, data)
}

const deleteCategoryById = async (body) => {
  const { id } = body
  const data = await deleteCategoryByIdDb(body)
  if (!data) {
    throw new Error(`Không thể xoá category: ${id}`)
  }
  return new ResponseResult(true, data)
}

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategoryById
}
