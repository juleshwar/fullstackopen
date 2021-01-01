module.exports = (error, request, response, next) => {
    console.error(error.message);
    return response.status(400).json({ error: error.message })
}