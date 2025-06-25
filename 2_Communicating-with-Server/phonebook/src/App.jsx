import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('New name')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleForm = (event) => {
    event.preventDefault()
    console.log(newName)
    const person = {
      name: newName,
    }

    setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}> 
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={i}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App