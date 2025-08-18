const Contacts = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {props.persons.map((person, i) => <li key={i}>`{person.name} - {person.number}`</li>)}
            </ul> 
        </div>
    )
}

export default Contacts