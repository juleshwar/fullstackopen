const info = (...params) => {
    if (process.env.NODE_ENV === 'test') return;
    console.info(...params);
}

const error = (...params) => {
    console.error(...params);
}

module.exports = {
    info,
    error
}