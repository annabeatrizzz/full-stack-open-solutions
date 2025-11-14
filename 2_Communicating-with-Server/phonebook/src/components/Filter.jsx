const Filter = (props) => {
    return (
        <div>
            <h2>Search</h2>
            <div>
                Filter contacts lists with: <input value={props.contactName} onChange={props.handleSearch}/>
            </div>
        </div>
    )
}

export default Filter