module.exports = (error, request, response, next) => {
    console.error(error.message);
    /* Custom errors */
    if (new RegExp("No \\w{1,} present").test(error.message)) {
        return response.status(403).json({ error: error.message })
    }
    return response.status(400).json({ error: error.message })
}