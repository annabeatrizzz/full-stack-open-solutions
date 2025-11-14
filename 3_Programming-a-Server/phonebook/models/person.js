require('dotenv').config()
const mongoose = require('mongoose')

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
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: {
    type: String,
    minLenght: 11,
    match: /^\d{3}-\d{3}-\d{3}$/,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)