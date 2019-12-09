const Recipe = require('../models/recipe.model')

const addRecipeBasicInfoDb = async (recipe) => {
  const newRecipe = new Recipe({
    ...recipe
  })

  const rs = await newRecipe.save()
  return rs
}

module.exports = {
  addRecipeBasicInfoDb
}
