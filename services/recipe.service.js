const uploadImage = require('../utils/uploadImage')
const { addRecipeBasicInfoDb } = require('../db/recipe.db')
const { ResponseResult } = require('../configs/config')

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

module.exports = {
  addRecipeBasicInfo
}
