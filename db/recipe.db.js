const Recipe = require('../models/recipe.model')

const addRecipeDb = async recipe => {
  const newRecipe = new Recipe({
    ...recipe
  })

  await newRecipe.save()
}

module.exports = {
  addRecipeDb
}
