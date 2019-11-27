const validator = require('validator')

const uploadImage = require('../utils/uploadImage')
const { ResponseResult } = require('../configs/config')
const CustomError = require('../errors/CustomError')
const errorCode = require('../errors/errorCode')
const {
  addRecipeBasicInfoDb,
  addRecipeMaterialDb
} = require('../db/recipe.db')

const addRecipeBasicInfo = async (body, files) => {
  const { image } = files

  const imageLink = await uploadImage(image, 'images/recipes')
  console.log(imageLink)

  const recipe = {
    ...body,
    image: imageLink
  }

  console.log('service')

  const rs = await addRecipeBasicInfoDb(recipe)
  return new ResponseResult(true, rs)
}

const addRecipeMaterial = async (body) => {
  const { materials } = body
  const length = materials.length

  for (let i = 0; i < length; i++) {
    const material = materials[i]
    if (typeof material !== 'object') {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải là Object`)
    }
    if (!('name' in material)) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có name`)
    }
    if (!('unit' in material)) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có unit`)
    }
    if (!('quantitative' in material)) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có quantitative`)
    }
    if (!validator.isNumeric(material.quantitative.toString())) {
      throw new CustomError(errorCode.BAD_REQUEST, `Nguyên liệu thứ ${i + 1} phải có quantitative là một số`)
    }
  }

  const rs = await addRecipeMaterialDb(body)
  return new ResponseResult(true, rs)
}

module.exports = {
  addRecipeBasicInfo,
  addRecipeMaterial
}
