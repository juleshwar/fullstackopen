const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    }
})

//#region Util functions
function curateSchema(schema) {
    return schema.set("toJSON", {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        },
    })
}
//#endregion Util functions

curateSchema(blogSchema)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog; 