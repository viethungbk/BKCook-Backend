const uploadImage = require('../utils/uploadImage')
const { addRecipeDb } = require('../db/recipe.db')

const addRecipe = async (body, files) => {
  const { image } = files

  const imageLink = await uploadImage(image, 'images/recipes')
  console.log(imageLink)

  const recipe = {
    ...body,
    image: imageLink
  }

  console.log('service')

  await addRecipeDb(recipe)
}

module.exports = {
  addRecipe
}
