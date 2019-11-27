const Recipe = require('../models/recipe.model')
const Material = require('../models/material.model')

const addRecipeBasicInfoDb = async (recipe) => {
  const newRecipe = new Recipe({
    ...recipe
  })

  const rs = await newRecipe.save()
  return rs
}

const addRecipeMaterialDb = async (body) => {
  const newMaterial = new Material({
    ...body
  })

  const rs = await newMaterial.save()
  return rs
}

module.exports = {
  addRecipeBasicInfoDb,
  addRecipeMaterialDb
}
