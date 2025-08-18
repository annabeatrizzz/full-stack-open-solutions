import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Contacts from './components/Contacts.jsx'
import PersonForm from './components/PersonForm.jsx'

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
      phone: newNumber
    }

    if (newName === '') {
      return window.alert(`Name inserted not valid`)
    } else if (persons.some(p => p.name === newName)) {
      return window.alert(`${newName} is already added to phonebook`)
    }     
    
    if (newNumber === '') {
      return window.alert(`Number inserted not valid`)
    }  

    setPersons(persons.concat(person))
    setNewName(defaultName)
    setNewNumber(defaultNumber)
  }

  const getPersons = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }
  useEffect(getPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter contactName={contactName} handleSearch={handleSearch} ></Filter>

      <PersonForm handleForm={handleForm} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}></PersonForm>

      <Contacts persons={persons}></Contacts>
     
    </div>
  )
}

export default App