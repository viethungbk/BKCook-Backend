const Step = require('../models/step.model')

const findRecipeStep = async (idRecipe) => {
  const rs = await Step.findOne({ idRecipe: idRecipe })
  return rs
}

const addStepDb = async (data) => {
  const { idRecipe } = data
  const foundStep = await findRecipeStep(idRecipe)
  const step = {
    ...data
  }
  delete step.idRecipe

  if (!foundStep) {
    const newStep = new Step({
      idRecipe,
      steps: [{
        ...step
      }]
    })
    const rs = await newStep.save()
    return rs
  } else {
    foundStep.steps.push(step)
    const rs = await foundStep.save()
    return rs
  }
}

module.exports = {
  addStepDb
}
