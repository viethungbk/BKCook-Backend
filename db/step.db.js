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
    for (let i = 0; i < foundStep.steps.length; i++) {
      if (foundStep.steps[i].stepNumber === Number.parseInt(step.stepNumber, 10)) {
        foundStep.steps.splice(i, 1)
      }
    }
    foundStep.steps.push(step)
    const rs = await foundStep.save()
    return rs
  }
}

module.exports = {
  addStepDb
}
