const mongoose = require('mongoose');

function getContactSchema() {
    const ContactSchema = new mongoose.Schema({
        name: String,
        number: String
    });
    return curateSchema(ContactSchema);
}

function curateSchema(schema) {
    return schema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    })
}

function getContactModel() {
    return mongoose.model('Contact', getContactSchema());
}

const ContactModel = getContactModel();

module.exports = ContactModel;