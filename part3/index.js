const express = require('express');
const morgan = require('morgan');
const { getPhonebook } = require('./resources');
const { getContact, deleteContact, addContact, generateId, doesContactAlreadyExist } = require('./services/Utility');
const HTTP_STATUS = require('./constants/HTTP_STATUS');

const PORT = process.env.PORT || 3001
const PREFIX = `/api`;

const server = express();

server.use(express.json());
server.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body),
    ].join(' ')
}));

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