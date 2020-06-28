const express = require('express');
const { PHONEBOOK } = require('./resources');
const { getContact } = require('./services/Utility');
const HTTP_STATUS = require('./constants/HTTP_STATUS');

const PORT = 3001;
const PREFIX = `/api`;

const server = express();

server.get(`/info`, (req, res) => {
    res.send(`
        Phonebook contains ${PHONEBOOK.length} contacts. <br/><br/>
        ${new Date()}
    `);
})

server.get(`${PREFIX}/persons`, (req, res) => {
    res.json(PHONEBOOK);
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

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})