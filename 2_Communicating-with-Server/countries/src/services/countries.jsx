import axios from "axios";

const url = 'https://studies.cs.helsinki.fi/restcountries/api/'

const get = (country) => {
    return axios
            .get(`${url}/name/${country}`)
}

const getAll = () => {
    return axios
            .get(`${url}all`)
}

export { get, getAll }