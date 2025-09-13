require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
let morgan = require('morgan')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

app.use(express.json())
app.use(morgan((tokens, request, response) => {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, request, 'content-length'), '-',
      tokens['response-time'](request, response), 'ms',
      JSON.stringify(request.body)
    ].join(' ')
  }))

const generateId = () => {
  return Math.floor(Math.random() * 100000000000000000).toString();
}

app.get('/', (request, response) => {
  response.send('<h1>Welcome to your phonebook :)</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('Request body:', body) 

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({ 
      error: 'name already in the phonebook' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persos/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
      response.json(person)  
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log('id on the back', id)
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})