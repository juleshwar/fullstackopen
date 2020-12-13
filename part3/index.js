const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const DatabaseHelper = require('./services/DatabaseHelper');
const HTTP_STATUS = require('./constants/HTTP_STATUS');

const PORT = process.env.PORT || 3001
const PREFIX = `/api`;

const server = express();

server.use(express.static('build'))

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

DatabaseHelper.connectToDatabase();

server.get(`/info`, (req, res) => {
    DatabaseHelper
        .getTotalContacts()
        .then(count => {
            res.send(`
            Phonebook contains ${count} contacts. <br/><br/>
            ${new Date()}
        `);
        })
        .catch(error => next(error))
})

server.get(`${PREFIX}/persons`, (req, res) => {
    DatabaseHelper
        .getAllContacts()
        .then(contacts => {
            res.json(contacts);
        })
        .catch(error => next(error))
})

server.get(`${PREFIX}/persons/:id`, (req, res) => {
    const id = req.params.id;
    DatabaseHelper
        .getContact(id)
        .then(contact => {
            if (contact) {
                res.json(contact);
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).end();
            }
        })
        .catch(error => next(error))
})

server.post(`${PREFIX}/persons`, (req, res, next) => {
    const { name, number } = req.body;
    if (!name) return raiseError(HTTP_STATUS.UNPROCESSABLE_ENTITY, `No name present`, res);
    if (!number) return raiseError(HTTP_STATUS.UNPROCESSABLE_ENTITY, `No number present`, res);
    // if (doesContactAlreadyExist(name)) return raiseError(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Name already exists`, res);

    DatabaseHelper
        .addContact(name, number)
        .then(_ => res.status(HTTP_STATUS.CREATED).end())
        .catch(error => next(error))
})

server.put(`${PREFIX}/persons/:id`, (req, res, next) => {
    const id = req.params.id;
    const number = req.body.number;
    DatabaseHelper
        .updateContact(id, number)
        .then(_ => res.status(HTTP_STATUS.NO_CONTENT_SUCCESS).end())
        .catch(error => next(error))
})

server.delete(`${PREFIX}/persons/:id`, (req, res, next) => {
    const id = req.params.id;
    DatabaseHelper
        .deleteContact(id)
        .then(_ => res.status(HTTP_STATUS.NO_CONTENT_SUCCESS).end())
        .catch(error => next(error))
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