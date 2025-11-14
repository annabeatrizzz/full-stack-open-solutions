import List from './List'
import Weather from './Wheather'

const Country = ( {countryInfo} ) => {
    if (!countryInfo) { 
        return null 
    }

    const capitalInfo = countryInfo['capitalInfo']

    return(
        <div>
            <h1>{countryInfo['name']['common']}</h1>
            <p>Capital {countryInfo['capital']}</p>
            <p>Area {countryInfo['area']}</p>

            <List title='Languages' items={countryInfo['languages']}></List>
        
            <img alt={countryInfo['flags']['alt']} src={countryInfo['flags']['png']}></img>

            <Weather lat={capitalInfo['latlng']}></Weather>
        </div>
    )
}

export default Country