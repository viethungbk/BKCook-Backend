const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const materialSchema = new mongoose.Schema({
  idRecipe: {
    type: ObjectId,
    ref: 'Recipe',
    required: true
  },
  materials: [
    {
      name: {
        type: String,
        trim: true
      },
      unit: {
        type: String,
        trim: true,
        lowercase: true
      },
      quantitative: {
        type: Number
      }
    }
  ]
})

const materialModel = mongoose.model('Material', materialSchema)

module.exports = materialModel
