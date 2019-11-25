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

module.exports = {
  pagination,
  staticFilePath,
  ResponseResult
}
