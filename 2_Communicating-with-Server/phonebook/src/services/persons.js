import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
            .get(url)
}

const create = (newPerson) => {
    return axios
            .post(url, newPerson) 
}

export { getAll, create }