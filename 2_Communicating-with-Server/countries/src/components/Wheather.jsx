import { get } from '../services/weather.jsx'
import { useState, useEffect } from 'react';

const Weather = (props) => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    
    const lat = props.lat[0] 
    const long =  props.lat[1]

    if (!lat){ 
        return;
    }
    useEffect(() => {
        get(lat, long)
        .then(response => {
        setWeatherInfo(response.data)
        })
    }, [lat]);

    if (!weatherInfo){ 
        return;
    }
    
    const temperature = weatherInfo.main.temp - 273.15
    const wind = weatherInfo.wind.speed
    const iconURL = `https://openweathermap.org/img/wn/${weatherInfo['weather'][0]['icon']}@2x.png`

    return (
        <div>
            <h2>Weather</h2>
            <div>Temperature {temperature} </div>
            <div><img alt='weather-icon' src={iconURL}/></div>
            <div>Wind {wind} meter/sec</div>
        </div>
    )
}

export default Weather