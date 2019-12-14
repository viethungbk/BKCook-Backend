const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const categoryService = require('../services/category.service')

const addCategory = async (req, res) => {
  const { body, files } = req
  const { title } = body

  if (!title) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập tên category')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho category')
  }

  const rs = await categoryService.addCategory(body, files)
  res.send(rs)
}

const getAllCategories = async (req, res) => {
  const rs = await categoryService.getAllCategories()
  res.send(rs)
}

const deleteCategoryById = async (req, res) => {
  const { body } = req
  const { id } = body

  if (!id) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập id của category')
  }

  const rs = await categoryService.deleteCategoryById(body)
  res.send(rs)
}

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategoryById
}
