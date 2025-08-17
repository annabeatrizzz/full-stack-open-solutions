const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleForm}> 
          <h2>New contact</h2>
          <div>
            Name: <input value={props.newName} onChange={props.handleNewName}/>
          </div>
          <div>
            Number: <input value={props.newNumber} onChange={props.handleNewNumber}/>
          </div>
          <div>
            <button type="submit">Add Contact</button>
          </div>
      </form>
    )
}

export default PersonForm