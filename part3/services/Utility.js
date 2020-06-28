const { PHONEBOOK } = require("../resources");

function getContact(id) {
    return PHONEBOOK.find(c => c.id === id);
}

module.exports = { getContact }