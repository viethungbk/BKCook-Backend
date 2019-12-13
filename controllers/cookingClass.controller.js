const validator = require('validator')

const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const cookingClassService = require('../services/cookingClass.service')

const addCookingClass = async (req, res) => {
  const { body, files } = req
  const { className, address, startDate, shortDescription } = body

  if (!className) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập tên lớp học')
  }
  if (!address) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập nội dung bài viết')
  }
  if (!startDate) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập ngày bắt đầu khai giảng lớp học')
  }
  const date = new Date(startDate)
  if (isNaN(date.getTime())) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập ngày bắt đầu hợp lệ')
  }
  if (!shortDescription) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy nhập mô tả ngắn cho lớp học')
  }
  if (!files || !files.image) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Hãy thêm ảnh cho lớp học')
  }

  const rs = await cookingClassService.addCookingClass(body, files)
  res.send(rs)
}

const getAllCookingClasses = async (req, res) => {
  const { query } = req
  const { page, records } = query

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

  const rs = await cookingClassService.getAllCookingClasses(query)
  res.send(rs)
}

module.exports = {
  addCookingClass,
  getAllCookingClasses
}
