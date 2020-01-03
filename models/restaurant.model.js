const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  iframe: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    require: true
  },
  image: {
    type: String,
    trim: true,
    require: true
  },
  tokens: [
    {
      token: {
        type: String
      }
    }
  ]
},
{
  timestamps: true
})

restaurantSchema.methods.generateAuthToken = async function () {
  const restaurant = this
  const token = jwt.sign({ _id: restaurant.id.toString(), expiresIn: '2 days' }, process.env.JWT_SECRET)

  restaurant.tokens = restaurant.tokens.concat({ token })
  await restaurant.save()

  return token
}

restaurantSchema.methods.toJSON = function () {
  const restaurant = this
  const restaurantObject = restaurant.toObject()
  delete restaurantObject.password
  delete restaurantObject.tokens

  return restaurantObject
}

restaurantSchema.pre('save', async function (next) {
  const restaurant = this
  if (restaurant.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    restaurant.password = await bcrypt.hash(restaurant.password, salt)
  }

  next()
})

const restaurantModel = mongoose.model('Restaurant', restaurantSchema)

module.exports = restaurantModel
