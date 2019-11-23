require('dotenv').config()
require('./db/mongoose')

const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())

app.use(cors())

app.use(fileUpload({ parseNested: true }))
// app.use('/api/users', require('./routes/user.route'))

app.use(express.static(path.join(__dirname, '../static')))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
