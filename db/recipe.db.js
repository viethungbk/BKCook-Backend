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
    ...recipe._doc,
    ...materials._doc,
    ...steps._doc,
    _id: recipe._id,
    __v: recipe.__v
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

const getRecipeByIdDb = async (query) => {
  const { idRecipe } = query
  const recipe = await Recipe.findById(idRecipe)
  let materials = await Material.findOne({ idRecipe })
  let steps = await Step.findOne({ idRecipe })

  if (!recipe) {
    return null
  }
  if (!materials) {
    materials = {}
  }
  if (!steps) {
    steps = {}
  }

  return {
    ...recipe._doc,
    ...materials._doc,
    ...steps._doc,
    _id: recipe._id,
    __v: recipe.__v
  }
}

const changeRecipeStatusDb = async (body) => {
  const { idRecipe, status } = body
  const recipe = await Recipe.findById(idRecipe)
  let materials = await Material.findOne({ idRecipe })
  let steps = await Step.findOne({ idRecipe })

  if (!recipe) {
    return null
  }
  if (!materials) {
    materials = {}
  }
  if (!steps) {
    steps = {}
  }

  recipe.status = status
  await recipe.save()

  return {
    ...recipe._doc,
    ...materials._doc,
    ...steps._doc,
    _id: recipe._id,
    __v: recipe.__v
  }
}

const deleteRecipeByIdDb = async (body) => {
  const { idRecipe } = body
  const recipe = await Recipe.findById(idRecipe)
  const materials = await Material.findOne({ idRecipe })
  const steps = await Step.findOne({ idRecipe })

  if (!recipe) {
    return null
  }
  if (materials) {
    await Material.findByIdAndRemove(materials._id)
  }
  if (steps) {
    await Step.findByIdAndRemove(materials._id)
  }
  const result = Recipe.findByIdAndRemove(recipe._id)
  return result
}

module.exports = {
  addRecipeBasicInfoDb,
  finishAddingRecipeDb,
  addRecipeCateDb,
  getRecipeByIdDb,
  changeRecipeStatusDb,
  deleteRecipeByIdDb
}
