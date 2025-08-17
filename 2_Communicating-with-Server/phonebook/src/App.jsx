import { useState } from 'react'
import Filter from './components/Filter.jsx'
import Contacts from './components/Contacts.jsx'
import PersonForm from './components/PersonForm.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123-456-789', id: 1},
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  
  const defaultName = 'New name'
  const defaultNumber = '999-999-999'
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