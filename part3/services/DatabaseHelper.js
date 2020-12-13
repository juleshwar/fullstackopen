const mongoose = require("mongoose")
const ContactModel = require("../models/contact")

class DatabaseHelper {
    static getAllContacts() {
        return ContactModel.find({})
    }

    static getTotalContacts() {
        return ContactModel.countDocuments({})
    }

    static getContact(id) {
        return ContactModel.findOne({ _id: id })
    }

    static addContact(name, number) {
        const newContact = new ContactModel({
            name,
            number,
        })
        return newContact.save()
    }

    static deleteContact(id) {
        return ContactModel.deleteOne({ _id: id })
    }

    static updateContact(id, number) {
        return ContactModel.updateOne(
            { _id: id },
            { $set: { number } },
            { runValidators: true },
        )
    }

    static connectToDatabase() {
        const url = process.env.MONGODB_URI
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(console.log("Connected to database"))
            .catch((error) => console.log("error", error))
    }

    static disconnectFromDatabase() {
        mongoose.connection
            .close()
            .then(console.log("Disconnected from database"))
    }
}

module.exports = DatabaseHelper
