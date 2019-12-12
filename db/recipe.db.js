const Recipe = require('../models/recipe.model')
const Material = require('../models/material.model')
const Step = require('../models/step.model')
const { roleType, recipeStatus } = require('../configs/config')

const addRecipeBasicInfoDb = async (recipe) => {
  const newRecipe = new Recipe({
    ...recipe
  })

  const rs = await newRecipe.save()
  return rs
}

const finishAddingRecipeDb = async (body, user) => {
  const { idRecipe } = body
  const recipe = await Recipe.findById(idRecipe)
  const materials = await Material.findOne({ idRecipe })
  const steps = await Step.findOne({ idRecipe })
  if (user.role === roleType.ADMIN) {
    recipe.status = recipeStatus.APPROVED
  } else {
    recipe.status = recipeStatus.READY
  }
  await recipe.save()

  return {
    recipe,
    materials,
    steps
  }
}

const addRecipeCateDb = async (body) => {
  const { idRecipe, typeRecipe, countryCuisine, processingMethod, purpose } = body
  const recipe = await Recipe.findById(idRecipe)
  recipe.typeRecipe = typeRecipe
  recipe.countryCuisine = countryCuisine
  recipe.processingMethod = processingMethod
  recipe.purpose = purpose

  const updatedRecipe = await recipe.save()
  return updatedRecipe
}

module.exports = {
  addRecipeBasicInfoDb,
  finishAddingRecipeDb,
  addRecipeCateDb
}
