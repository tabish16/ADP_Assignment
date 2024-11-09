
const axios = require("axios");
const logger = require('./logger');
const constants = require('./constants');

/**
 * Submits the processed task result to a specified API endpoint.
 * @async
 * @function submitResult
 * @param {Object} body - Payload object containing the ID and an array of results to submit.
 * @returns {Promise<{Status Code: number, Description: string}>} A promise resolving to an object with the status code of the response and a success message.
 */
const submitResult = async function submitResult(body) {

  let response = await axios.post(constants.SUBMIT_TASK_URL, body);
  logger.info(`POST Request Status: ${response.status}`);

  return { "Status Code": response.status, "Description": "Success" };
}

module.exports = { submitResult }

