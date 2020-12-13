const HTTP_STATUS = require("../constants/HTTP_STATUS")

const ErrorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(HTTP_STATUS.NOT_FOUND).send({ error: 'Malformatted Id' })
    } else if (error.name === 'ValidationError') {
        return response.status(HTTP_STATUS.FORBIDDEN).json({ error: error.message })
    }
    next(error)
}

module.exports = ErrorHandler;