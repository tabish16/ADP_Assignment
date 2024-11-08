const axios = require("axios");
const logger = require('./logger');
const constants = require('./constants');

/**
 * Submits the task result to the API.
 * @param {object} payload - Object containing the ID and result array.
 * @returns {Promise<object>} The response from the POST request.
 */
const submitResult = async function submitResult(body) {

  let response = await axios.post(constants.SUBMIT_TASK_URL, body);
  logger.info(`POST Request Status: ${response.status}`);

  return { "Status Code": response.status, "Description": "Success" };
}

module.exports = { submitResult }

