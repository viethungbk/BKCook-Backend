const pagination = {
  pageNumber: 1,
  recordNumber: 10
}

const staticFilePath = `${__dirname}/../static`

const ResponseResult = class {
  constructor (success = true, data = {}) {
    this.success = success
    this.data = data
  }
}

const roleType = {
  // Quản trị viên
  ADMIN: 1,
  // Người kiểm duyệt
  CENSOR: 2,
  // Người dùng
  USER: 3
}

module.exports = {
  pagination,
  staticFilePath,
  ResponseResult,
  roleType
}
