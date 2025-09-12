import axios from 'axios'

const url = '/api/persons'

const getAll = () => {
    return axios
            .get(url)
}

const create = (newPerson) => {
    return axios
            .post(url, newPerson) 
}

const update = (newPerson, id) => {
    return axios
            .put(`${url}/${id}`, newPerson)
}

const deletePerson = (id) => {
    console.log('id on the front', id)
    return axios
        .delete(`${url}/${id}`)
}

export { getAll, create, update, deletePerson }