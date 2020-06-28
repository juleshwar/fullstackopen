let { getPhonebook, setPhonebook } = require("../resources");

function getContact(id) {
    return getPhonebook().find(c => c.id === id);
}

function deleteContact(id) {
    return setPhonebook(getPhonebook().filter(c => c.id !== id));
}

function addContact(contact) {
    setPhonebook(getPhonebook().concat(contact));
}

function generateId() {
    let pseudoRandomId = Math.floor(Math.random() * 1000);
    while (getPhonebook().find(c => c.id === pseudoRandomId)) {
        pseudoRandomId = Math.floor(Math.random() * 1000);
    }
    return pseudoRandomId;
}

function doesContactAlreadyExist(name) {
    return getPhonebook().find(c => c.name === name);
}

module.exports = { getContact, deleteContact, addContact, generateId, doesContactAlreadyExist }