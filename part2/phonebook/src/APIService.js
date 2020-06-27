import axios from 'axios';

export default class APIServiceBean {
    async postPerson(person) {
        const response = await axios
            .post(`http://localhost:3001/persons`, person);
        return response.data;
    }
}

const APIService = new APIServiceBean()

export { APIService };