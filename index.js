require('dotenv').config()
require('./db/mongoose')

const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')

const app = express()
// const port = process.env.PORT || 5000
const port = 2900
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())

app.use(cors())

app.use(fileUpload({ parseNested: true }))
app.use('/api/users', require('./routes/user.route'))
app.use('/api/blogs', require('./routes/blog.route'))
app.use('/api/cooking-classes', require('./routes/cookingClass.route'))
app.use('/api/restaurants', require('./routes/restaurant.route'))
app.use('/api/restaurant-recipes', require('./routes/restaurantRecipe.route'))
app.use('/api/recipes', require('./routes/recipe.route'))
app.use('/api/posts', require('./routes/post.route'))

app.use(express.static(path.join(__dirname, '../static')))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
