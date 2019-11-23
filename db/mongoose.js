require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error.')
  console.error(err)
  process.exit()
})

mongoose.connection.once('open', () => {
  console.log('MongoDB connect successfully')
})
