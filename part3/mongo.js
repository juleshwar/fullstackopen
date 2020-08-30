const mongoose = require('mongoose');

/* No password case */
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

connectToDatabase();


if (process.argv[3]) {
    /* More arguments meaning a contact is being created */
    const name = process.argv[3];
    const number = process.argv[4];

    addContact(name, number)
        .then(_ => {
            console.log(`Added ${name}'s contact (${number}) to phonebook`);
            disconnectFromDatabase();
        })
        .catch((e) => {
            console.log('Something went wrong while saving contact. Please try again!', e);
            disconnectFromDatabase();
        })
} else {
    /* List all contacts */
    getAllContacts()
        .then(result => {
            result.forEach(contact => {
                console.log(`${contact.name} ${contact.number}`);
            })
            disconnectFromDatabase()
        })
        .catch((e) => {
            console.log('Something went wrong while getting the contacts. Please try again!', e);
            disconnectFromDatabase()
        })
}

function getAllContacts() {
    const Contact = getContactModel();
    return Contact.find({});
}

function addContact(name, number) {
    const Contact = getContactModel();
    const newContact = new Contact({
        name,
        number
    })
    return newContact.save();
}

function getContactModel() {
    const ContactSchema = new mongoose.Schema({
        name: String,
        number: String
    });

    return mongoose.model('Contact', ContactSchema);
}

function connectToDatabase() {
    const password = process.argv[2];
    const url = `mongodb+srv://newUser:${password}@cluster0.mmi6o.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log('error', error));
}

function disconnectFromDatabase() {
    mongoose.connection.close();
}