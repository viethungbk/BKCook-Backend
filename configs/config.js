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

const role = {
  // Quản trị viên
  ADMIN: 0,
  // Người kiểm duyệt
  CENSOR: 1,
  // Người dùng
  USER: 2
}

module.exports = {
  pagination,
  staticFilePath,
  ResponseResult,
  role
}
