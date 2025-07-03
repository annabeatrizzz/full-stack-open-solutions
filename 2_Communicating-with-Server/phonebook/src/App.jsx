import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123-456-789' }
  ]) 
  
  const defaultName = 'New name'
  const defaultNumber = '999-999-999'
  const [newName, setNewName] = useState(defaultName)
  const [newNumber, setNewNumber] = useState(defaultNumber)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
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
      <form onSubmit={handleForm}> 
        <div>
          Name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">Add Contact</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={i}>`{person.name} - {person.phone}`</li>)}
      </ul>
    </div>
  )
}

export default App