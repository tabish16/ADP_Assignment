const axios = require("axios");
const logger = require('./logger');
const constants = require('./constants');

/**
 * Fetches task data from a specified API endpoint.
 * @async
 * @function fetchTask
 * @returns {Promise<Object>} A promise that resolves to the data retrieved from the GET request.
 */
async function fetchTask() {

    const response = await axios.get(constants.GET_TASK_URL);
    logger.info(`GET Request Status: ${response.status}`);
    return response.data;
}

module.exports = fetchTask;
