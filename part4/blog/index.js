const app = require("./app");
const logger = require("./utils/logger");
const CONFIG = require("./utils/config");
const PORT = CONFIG.PORT;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})