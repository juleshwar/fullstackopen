const express = require('express')
const app = express()
const mongoose = require('mongoose')
const CONFIG = require("./utils/config");
const blogsRouter = require('./controllers/blogs')
const ErrorHandler = require("./services/ErrorHandler");

/* Antidote to having try-catch blocks everywhere */
require('express-async-errors')

mongoose.connect(CONFIG.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(ErrorHandler);

module.exports = app;