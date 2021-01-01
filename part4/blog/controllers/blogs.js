const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get('/', (request, response, next) => {
    return Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(e => next(e))
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    return blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(e => next(e))
})

module.exports = blogsRouter;