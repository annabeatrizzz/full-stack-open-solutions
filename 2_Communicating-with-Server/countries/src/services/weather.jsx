import axios from "axios";

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = import.meta.env.VITE_SOME_KEY
const get = (lat, long) => {
    return axios
            .get(`${url}lat=${lat}&lon=${long}&appid=${apiKey}`)
}

export { get }