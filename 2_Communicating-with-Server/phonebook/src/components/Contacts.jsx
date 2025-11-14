import Button from './Button.jsx'

const Contacts = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {props.persons.map((person) => <li key={person.id}>`{person.name} - {person.number}` <Button text="Delete contact" onClick={() => props.deleteMethod(person.id)}></Button></li>)}
            </ul> 
        </div>
    )
}

export default Contacts