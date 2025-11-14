const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
const password = process.argv[2]
const url = `mongodb+srv://db_user:${password}@clusterphonebook.sdklevw.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPhonebook`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

const listPhonebook = () => {
  mongoose.connect(url).then(() => {
    return Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
  })  
}

const addContact = () => {

  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ 
      name: name, 
      number: number
  })

  mongoose.connect(url).then(() => {
    person.save().then(result => {
      console.log(`Person saved! ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
  })
}

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  listPhonebook()
} else {
  addContact()
}
