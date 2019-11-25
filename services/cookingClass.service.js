const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const { addCookingClassDb } = require('../db/cookingClass.db')

const addCookingClass = async (body, files) => {
  const { image } = files
  const imageLink = await uploadImage(image, '/images/blogs')

  const cookingClass = {
    ...body,
    image: imageLink
  }

  const data = await addCookingClassDb(cookingClass)

  if (!data) {
    throw new Error('Không thể thêm blog')
  }
  return new ResponseResult(true, data)
}

module.exports = {
  addCookingClass
}
