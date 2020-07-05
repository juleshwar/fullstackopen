import axios from 'axios';

export default class APIServiceBean {
    async getPersons() {
        const response = await axios
            .get(`/api/persons`)
        return response.data;
    }

    async postPerson(person) {
        const response = await axios
            .post(`/api/persons`, person);
        return response.data;
    }

    async putPerson(person) {
        const response = await axios
            .put(`/api/persons/${person.id}`, person)
        return response.data;
    }

    async deletePerson(person) {
        return axios.delete(`/api/persons/${person.id}`)
    }
}

const APIService = new APIServiceBean()

export { APIService };