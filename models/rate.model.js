const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const rateSchema = new mongoose.Schema({
  idRecipe: {
    type: ObjectId,
    ref: 'Recipe',
    required: true
  },
  ratingNumber: {
    type: Number
  },
  rates: [
    {
      idUser: {
        type: ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number
      }
    }
  ]
})

const rateModel = mongoose.model('Rate', rateSchema)

module.exports = rateModel
