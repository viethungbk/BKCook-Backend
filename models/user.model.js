const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { roleType } = require('../configs/config')

const userSchema = new mongoose.Schema({
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
  role: {
    type: Number,
    required: true,
    default: roleType.USER
  },
  userName: {
    type: String,
    trim: true,
    maxlength: 50,
    required: true
  },
  gender: {
    type: String
  },
  avatar: {
    type: String
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  dateCreated: {
    type: Date,
    default: Date.now()
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

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user.id.toString(), expiresIn: '1h' }, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  // delete userObject.role

  return userObject
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }

  next()
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
