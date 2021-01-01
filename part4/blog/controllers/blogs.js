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
    const { url, title } = blog;
    if (!title) {
        throw new Error("No title present")
    }
    if (!url) {
        throw new Error("No url present")
    }
    return blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(e => next(e))
})

blogsRouter.delete('/:id', (request, response, next) => {
    const { id } = request.params;
    return Blog
        .deleteOne({ _id: id })
        .then(_ => {
            response.sendStatus(204);
        })
        .catch(e => next(e));
})

module.exports = blogsRouter;