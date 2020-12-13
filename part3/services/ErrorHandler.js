const HTTP_STATUS = require("../constants/HTTP_STATUS")

// eslint-disable-next-line consistent-return
const ErrorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "Error") {
        /* Custom errors */
        if (new RegExp("No \\w{1,} present").test(error.message)) {
            return response.status(HTTP_STATUS.FORBIDDEN).json({ error: error.message })
        }
    } else if (error.name === "CastError" && error.kind === "ObjectId") {
        return response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Malformatted Id" })
    } else if (error.name === "ValidationError") {
        return response.status(HTTP_STATUS.FORBIDDEN).json({ error: error.message })
    }
    next(error)
}

module.exports = ErrorHandler
