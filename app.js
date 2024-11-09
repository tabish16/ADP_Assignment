const processTransaction = require("./processTransaction");
const submitTask = require("./submitTask");
const logger = require('./logger');

/**
 * Main function that processes transactions and submits the result.
 * 
 * It first calls `processTransactions` to get data and transaction IDs, then submits 
 * the result using `submitResult`. If any error occurs during the process, it is logged using `logger.error`.
 * 
 * @async
 * @function main
 * @throws {Error} If an error occurs during transaction processing or result submission.
 */
async function main() {
    try {
        const getReponse = await processTransaction.processTransactions();

        const postResponse = await submitTask.submitResult(getReponse);
        console.log(postResponse);

    } catch (error) {
        logger.error(error);
    }
}

main();