const mongoose = require("mongoose");
const ContactModel = require("../models/contact");

class DatabaseHelperBean {
    getAllContacts() {
        return ContactModel.find({});
    }
    getContact(id) {
        return ContactModel.findOne({ _id: id });
    }
    addContact(name, number) {
        const newContact = new ContactModel({
            name,
            number
        })
        return newContact.save();
    }
    deleteContact(id) {
        return ContactModel.deleteOne({ _id: id });
    }
    updateContact(id, number) {
        return ContactModel.updateOne({ _id: id }, {
            $set: { number }
        })
    }
    connectToDatabase() {
        const url = process.env.MONGODB_URI;
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(console.log("Connected to database"))
            .catch(error => console.log('error', error));
    }
    disconnectFromDatabase() {
        mongoose.connection
            .close()
            .then(console.log("Disconnected from database"));
    }
}


module.exports = new DatabaseHelperBean();