const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const stepSchema = new mongoose.Schema({
  idRecipe: {
    type: ObjectId,
    ref: 'Recipe',
    required: true
  },
  steps: [
    {
      stepNumber: {
        type: Number,
        require: true
      },
      description: {
        type: String,
        trim: true
      },
      image: {
        type: String,
        trim: true
      },
      tricks: {
        type: String,
        trim: true
      },
      time: {
        type: Number
      }
    }
  ]
})

const stepModel = mongoose.model('Step', stepSchema)

module.exports = stepModel
