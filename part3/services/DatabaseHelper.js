const mongoose = require("mongoose");
const ContactModel = require("../models/note");

class DatabaseHelperBean {
    getAllContacts() {
        return ContactModel.find({});
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