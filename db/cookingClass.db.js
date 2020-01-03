const CookingClass = require('../models/cookingClass.Model')
const { pagination } = require('../configs/config')

const addCookingClassDb = async (cookingClass) => {
  const newCookingClass = new CookingClass({
    ...cookingClass
  })

  const rs = await newCookingClass.save()
  return rs
}

const getAllCookingClassesDb = async (query) => {
  let { page, records } = query
  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)
  const totalRecords = await CookingClass.countDocuments()

  const cookingClasses = await CookingClass.find({})
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    cookingClasses
  }
}

module.exports = {
  addCookingClassDb,
  getAllCookingClassesDb
}
