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

const postStatus = {
  NOT_APPROVED: 0,
  APPROVED: 1
}

const roleType = {
  // Quản trị viên
  ADMIN: 1,
  // Người kiểm duyệt
  CENSOR: 2,
  // Người dùng
  USER: 3
}

const recipeStatus = {
  // Trạng thái khởi tạo: công thức đang được tạo
  INIT: 0,
  // Công thức đã tạo xong, chờ được duyệt
  READY: 1,
  // Công thức không được chấp nhận
  NOT_APPROVED: -1,
  // Công thức đã được duyệt
  APPROVED: 2
}

// Độ khó của công thức
const recipeLevel = {
  VERY_EASY: 0,
  EASY: 1,
  MEDIUM: 2,
  DIFFICULT: 3,
  VERY_DIFFICULT: 4
}

module.exports = {
  pagination,
  staticFilePath,
  ResponseResult,
  roleType,
  postStatus,
  recipeStatus,
  recipeLevel
}
