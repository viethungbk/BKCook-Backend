const Material = require('../models/material.model')

const findRecipeMaterial = async (idRecipe) => {
  const rs = await Material.findOne({ idRecipe: idRecipe })
  return rs
}

const addMaterialsDb = async (data) => {
  const { idRecipe, materials } = data
  const foundMaterial = await findRecipeMaterial(idRecipe)

  if (!foundMaterial) {
    const newMaterial = new Material({
      idRecipe,
      materials
    })
    const rs = await newMaterial.save()
    return rs
  } else {
    foundMaterial.materials = foundMaterial.materials.concat(materials)
    const rs = await foundMaterial.save()
    return rs
  }
}

module.exports = {
  addMaterialsDb
}
