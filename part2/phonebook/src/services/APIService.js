import axios from 'axios';

export default class APIServiceBean {
    async postPerson(person) {
        const response = await axios
            .post(`http://localhost:3001/persons`, person);
        return response.data;
    }

    async putPerson(person) {
        const response = await axios
            .put(`http://localhost:3001/persons/${person.id}`, person)
        return response.data;
    }

    async deletePerson(person) {
        return axios.delete(`http://localhost:3001/persons/${person.id}`)
    }
}

const APIService = new APIServiceBean()

export { APIService };