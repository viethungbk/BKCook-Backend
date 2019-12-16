const Recipe = require('../models/recipe.model')
const Material = require('../models/material.model')
const Step = require('../models/step.model')
const { roleType, recipeStatus } = require('../configs/config')
const { pagination } = require('../configs/config')

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
  const { idRecipe, typeRecipe, countryCuisine, processingMethod, purpose, tags } = body
  const recipe = await Recipe.findById(idRecipe)
  recipe.typeRecipe = typeRecipe
  recipe.countryCuisine = countryCuisine
  recipe.processingMethod = processingMethod
  recipe.purpose = purpose
  recipe.tags = tags

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
  recipe.view += 1
  await recipe.save()

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

const searchRecipeDb = async (query) => {
  let { key, page, records } = query
  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)

  const fields = ['title', 'tags', 'typeRecipe', 'countryCuisine', 'typeOfDish', 'processingMethod', 'season', 'purpose']
  const querySearch = []
  const regExp = new RegExp(key, 'i')

  fields.forEach(field => {
    const obj = {}
    obj[field] = regExp
    querySearch.push(obj)
  })

  const totalRecords = await Recipe.countDocuments({
    $or: querySearch
  })

  const recipes = await Recipe
    .find({
      $or: querySearch
    })
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    recipes
  }
}

const filterRecipeDb = async (query) => {
  let { level, page, records } = query
  const fields = ['tags', 'typeRecipe', 'countryCuisine', 'typeOfDish', 'processingMethod', 'season', 'purpose']
  const queryFilter = {}
  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)

  fields.forEach(field => {
    if (query[field]) {
      queryFilter[field] = new RegExp(query[field], 'i')
    }
  })
  queryFilter.status = recipeStatus.APPROVED
  if (level) {
    queryFilter.level = level
  }

  const totalRecords = await Recipe.countDocuments({
    ...queryFilter
  })
  const recipes = await Recipe.find({
    ...queryFilter
  })
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    recipes
  }
}

const getReadyRecipeDb = async () => {
  const recipes = await Recipe.find({
    status: recipeStatus.READY
  })

  return recipes
}

const getRelateRecipeDb = async (query) => {
  let { idRecipe, page, records } = query

  if (page === null) {
    page = pagination.pageNumber
  }
  if (records === null) {
    records = pagination.recordNumber
  }
  page = Number.parseInt(page, 10)
  records = Number.parseInt(records, 10)

  const recipe = await Recipe.findById(idRecipe)
  if (!recipe) {
    return null
  }

  const fields = ['tags', 'typeRecipe', 'typeOfDish', 'processingMethod', 'purpose']
  const filter = []

  fields.forEach(field => {
    const listKeys = recipe[field]
    if (listKeys && Array.isArray(listKeys)) {
      listKeys.forEach(key => {
        const temp = {}
        // Make regex to ignore case
        temp[field] = new RegExp(key, 'i')
        filter.push({ ...temp })
      })
    }
  })

  const totalRecords = await Recipe.countDocuments({
    $and: [
      { status: 2 },
      {
        $or: [
          ...filter
        ]
      }
    ]
  })

  const recipes = await Recipe
    .find({
      $and: [
        { status: 2 },
        {
          $or: [
            ...filter
          ]
        }
      ]
    })
    .skip((page - 1) * records)
    .limit(records)

  return {
    totalRecords,
    recipes
  }
}

const getRelateClassDb = async () => {

}

const getRelateRestaurantDb = async () => {

}

const getTotalRecipeDb = async () => {
  const total = await Recipe.countDocuments({})
  return total
}

module.exports = {
  addRecipeBasicInfoDb,
  finishAddingRecipeDb,
  addRecipeCateDb,
  getRecipeByIdDb,
  changeRecipeStatusDb,
  deleteRecipeByIdDb,
  searchRecipeDb,
  filterRecipeDb,
  getReadyRecipeDb,
  getRelateRecipeDb,
  getRelateClassDb,
  getRelateRestaurantDb,
  getTotalRecipeDb
}
