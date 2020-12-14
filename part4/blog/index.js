const express = require('express')
const app = express()
const mongoose = require('mongoose')
const CONFIG = require("./utils/config");
const blogsRouter = require('./controllers/blogs')
const logger = require("./utils/logger");

mongoose.connect(CONFIG.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = CONFIG.PORT;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})