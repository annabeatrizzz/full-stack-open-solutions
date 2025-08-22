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

const deletePerson = (id) => {
    return axios
        .delete(`${url}/${id}`)
}

export { getAll, create, deletePerson }