require('dotenv').config()
const mongoose = require('mongoose')

console.log('test', process.env.PORT)

mongoose.set('strictQuery',false)

//Connect to DB
const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then(result => {
        console.log('Connection to MongoDB successfull.')
    })
    .catch(error => {
        console.log('Connection failed to MongoDB: ', error.message)
    })

//Document schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)