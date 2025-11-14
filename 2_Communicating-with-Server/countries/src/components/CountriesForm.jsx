const CountriesForm = (props) => {
    return (
        <div>
            <form>
                <div>Find countries: <input onChange={props.onChange}/></div>
                <div>{props.msg}</div>
            </form>
        </div>
    )

}


export default CountriesForm