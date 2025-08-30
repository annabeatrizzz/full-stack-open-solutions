const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  return Math.floor(Math.random() * 100000000000000000);
}

app.get('/', (request, response) => {
  response.send('<h1>Welcome to your phonebook :)</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('Request body:', body) 

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/person/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
      response.json(person)  
  }
  response.status(404).end()
})

app.delete('/api/person/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.get('/api/info', (request, response) => {
  const personsSize = persons.length 
  const today = new Date();
  response.send(`
    <h1>Phonebook Info<h1>
    <div>Phonebook has ${personsSize}</div>
    <div>${today}<div>
    `)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)