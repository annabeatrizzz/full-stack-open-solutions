import { useState, useEffect } from 'react'
import { getAll, create, update, deletePerson } from './services/persons.js'

import Filter from './components/Filter.jsx'
import Contacts from './components/Contacts.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const defaultName = 'New name'
  const defaultNumber = '999-999-999'
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState(defaultName)
  const [contactName, setContactName] = useState('')
  const [newNumber, setNewNumber] = useState(defaultNumber)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')

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

  const showMessage = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
        setTimeout(() => {
          setMessage(null)
          setMessageType(type)
        }, 5000)
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
    } 
    
    const p = persons.filter(p => p.name === newName)
    if (p.length > 0) {
      const result = window.confirm('Person is already in the Phonebook. Want to update the contact with the new number?')
      if (result) {
        update(person,  p[0].id)
          .then(response => {
            setPersons(persons.map(p => p.name === person.name ? response.data : p))
          })
          .catch(error => {
            showMessage(`Information ${newName} from has already been removed from the contact list`, 'error')
          })
        showMessage("Contact got updated", 'success')
        setNewName(defaultName)
        setNewNumber(defaultNumber)
      } 
      return
    }     
    
    if (newNumber === '') {
      return window.alert(`Number inserted not valid`)
    }  

    create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName(defaultName)
        setNewNumber(defaultNumber)    
        showMessage('Contact created', 'success')
      })
      .catch(error => {
        console.log('this is an error', error)
        showMessage(`Person validation failed ${error}`, "error")
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
    let personToDelete = persons.filter(p => id === p.id)
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
      showMessage('Contact deleted', 'success')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification type={messageType} message={message}></Notification>

      <Filter contactName={contactName} handleSearch={handleSearch} ></Filter>

      <PersonForm handleForm={handleForm} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}></PersonForm>

      <Contacts persons={persons} deleteMethod={deletePersonById}></Contacts>
     
    </div>
  )
}

export default App