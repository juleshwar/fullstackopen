const express = require('express');
const { NOTES } = require('./resources');

const PORT = 3001;
const PREFIX = `/api`;

const server = express();

server.get(`${PREFIX}/persons`, (req, res) => {
    res.json(NOTES);
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})