const CookingClass = require('../models/cookingClass.Model')
// const { pagination } = require('../configs/config')

const addCookingClassDb = async (cookingClass) => {
  const newCookingClass = new CookingClass({
    ...cookingClass
  })

  const rs = await newCookingClass.save()
  return rs
}

module.exports = {
  addCookingClassDb
}
