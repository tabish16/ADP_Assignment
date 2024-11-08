
const axios = require("axios");
const logger = require('./logger');
const constants = require('./constants');

/**
 * Fetches task data from the provided API endpoint.
 * @returns {Promise<object>} The data from the GET request.
 */
async function fetchTask() {

    const response = await axios.get(constants.GET_TASK_URL);
    logger.info(`GET Request Status: ${response.status}`);
    return response.data;
}

module.exports = fetchTask;
