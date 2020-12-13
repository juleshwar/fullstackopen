const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

function getContactSchema() {
    const ContactSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            unique: true
        },
        number: {
            type: String,
            minlength: 8,
            required: true,
        }
    });
    ContactSchema.plugin(uniqueValidator);
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