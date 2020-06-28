let { getPhonebook, setPhonebook } = require("../resources");

function getContact(id) {
    return getPhonebook().find(c => c.id === id);
}

function deleteContact(id) {
    return setPhonebook(getPhonebook().filter(c => c.id !== id));
}

module.exports = { getContact, deleteContact }