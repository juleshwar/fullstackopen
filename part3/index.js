const express = require('express');
const morgan = require('morgan');
const { getPhonebook } = require('./resources');
const { getContact, deleteContact, addContact, generateId, doesContactAlreadyExist } = require('./services/Utility');
const HTTP_STATUS = require('./constants/HTTP_STATUS');

const PORT = 3001;
const PREFIX = `/api`;

const server = express();
initMorgan();

server.use(express.json());
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));

function initMorgan() {
    morgan.token('request-body', function (req, res) { return JSON.stringify(req.body) })
}

server.get(`/info`, (req, res) => {
    res.send(`
        Phonebook contains ${getPhonebook().length} contacts. <br/><br/>
        ${new Date()}
    `);
})

server.get(`${PREFIX}/persons`, (req, res) => {
    res.json(getPhonebook());
})

server.get(`${PREFIX}/persons/:id`, (req, res) => {
    const id = Number(req.params.id);
    const contact = getContact(id);
    if (contact) {
        res.json(contact);
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).end();
    }
})

server.post(`${PREFIX}/persons`, (req, res) => {
    const { name, number } = req.body;
    if (!name) return raiseError(HTTP_STATUS.UNPROCESSABLE_ENTITY, `No name present`, res);
    if (!number) return raiseError(HTTP_STATUS.UNPROCESSABLE_ENTITY, `No number present`, res);
    if (doesContactAlreadyExist(name)) return raiseError(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Name already exists`, res);

    const newContact = {
        id: generateId(),
        name,
        number
    };
    addContact(newContact);
    res.json(newContact)
})

server.delete(`${PREFIX}/persons/:id`, (req, res) => {
    const id = Number(req.params.id);
    deleteContact(id);
    res.status(HTTP_STATUS.NO_CONTENT_SUCCESS).end();
})

function raiseError(http_status, error, response) {
    return response
        .status(http_status)
        .json({ error })
        .end();
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})