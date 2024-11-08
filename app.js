const processTransaction = require("./processTransaction");
const submitTask = require("./submitTask");
const logger = require('./logger');

async function main() {
    try {
        // Get data Id and top earner transaction Ids array
        const getReponse = await processTransaction.processTransactions();

        // Post the response
        const postResponse = await submitTask.submitResult(getReponse);
        console.log(postResponse);
    } catch (e) {
        logger.error(e);
    }
}

main();