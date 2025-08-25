import List from './List'

const Country = ( {countryInfo} ) => {
    if (!countryInfo) { 
        return null 
    }

    return(
        <div>
            <h1>{countryInfo['name']['common']}</h1>
            <p>Capital {countryInfo['capital']}</p>
            <p>Area {countryInfo['area']}</p>

            <List title='Languages' items={countryInfo['languages']}></List>
        
            <img alt={countryInfo['flags']['alt']} src={countryInfo['flags']['png']}></img>
        </div>
    )
}

export default Country