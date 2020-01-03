const Category = require('../models/category.model')

const addCategoryDb = async (category) => {
  const newCategory = new Category({
    ...category
  })

  const rs = await newCategory.save()
  return rs
}

const getAllCategoriesDb = async () => {
  const categories = await Category.find({})
  return categories
}

const deleteCategoryByIdDb = async (body) => {
  const { id } = body

  const rs = await Category.findByIdAndRemove(id)
  return rs
}

module.exports = {
  addCategoryDb,
  getAllCategoriesDb,
  deleteCategoryByIdDb
}
