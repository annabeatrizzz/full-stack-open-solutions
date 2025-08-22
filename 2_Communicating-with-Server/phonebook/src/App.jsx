import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Contacts from './components/Contacts.jsx'
import PersonForm from './components/PersonForm.jsx'
import { getAll, create, deletePerson } from './services/persons.js'

const App = () => {
  const defaultName = 'New name'
  const defaultNumber = '999-999-999'
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState(defaultName)
  const [contactName, setContactName] = useState('')
  const [newNumber, setNewNumber] = useState(defaultNumber)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setContactName(event.target.value)
    console.log(contactName)


    const personsFiltered = persons.filter(p => p.name.toLowerCase().includes(contactName.toLowerCase()))
    if (personsFiltered.length === 0) {
      return window.alert('Person not found')
    }
    setPersons(personsFiltered)
  } 

  const handleForm = (event) => {
    event.preventDefault()
    console.log(newName)
    console.log(newNumber)

    const person = {
      name: newName, 
      number: newNumber
    }

    if (newName === '') {
      return window.alert(`Name inserted not valid`)
    } else if (persons.some(p => p.name === newName)) {
      return window.alert(`${newName} is already added to phonebook`)
    }     
    
    if (newNumber === '') {
      return window.alert(`Number inserted not valid`)
    }  

    create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName(defaultName)
        setNewNumber(defaultNumber)
      })
  }

  const getPersons = () => {
    getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(getPersons, [])

  const deletePersonById = (id) => {
    var personToDelete = persons.filter(p => id === p.id)
    personToDelete = personToDelete[0]
    const result = window.confirm(`Do you wish to delete the person ${personToDelete.name}`)

    if (!result) {
      return
    } 

    deletePerson(id)
      .then(response => {
        console.log('Delete person clicked')
        setPersons(persons.filter(p => (p.id !== id)))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter contactName={contactName} handleSearch={handleSearch} ></Filter>

      <PersonForm handleForm={handleForm} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}></PersonForm>

      <Contacts persons={persons} deleteMethod={deletePersonById}></Contacts>
     
    </div>
  )
}

export default App