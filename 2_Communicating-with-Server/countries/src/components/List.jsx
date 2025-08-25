const List = (props) => {
    console.log(props)
    if (!props.items) {
        return null
    }

    let listItems = Array.isArray(props.items) ? props.items : Object.values(props.items);

    return (
        <div>
            <h2>{props.title}</h2>
            <ul>
                {listItems.map((item, index) => <li key={index}>{item}</li>)}
            </ul>

        </div>
    )
}

export default List