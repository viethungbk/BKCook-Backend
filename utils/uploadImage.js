const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const uploadImage = async (imageFile, relativePath) => {
  let imageLink
  try {
    const absolutePath = path.join(__dirname, '../static', relativePath)

    fs.mkdirSync(absolutePath, {
      recursive: true
    })

    const fileName = imageFile.name.trim()
    const indexOfDot = fileName.lastIndexOf('.')
    const temp =
      fileName.slice(0, indexOfDot) +
      shortid.generate() +
      fileName.slice(indexOfDot, fileName.length)
    const newName = temp.split(' ').join('-')
    const filePath = `${absolutePath}/${newName}`

    await imageFile.mv(filePath)

    imageLink = `${relativePath}/${newName}`
  } catch (err) {
    throw new Error(`Can't store image + ${imageFile.name}`)
  }
  return imageLink
}

module.exports = uploadImage
