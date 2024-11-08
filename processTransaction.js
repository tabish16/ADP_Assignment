const axios = require("axios");
const logger = require('./logger');
const fetchTask = require('./fetchTask');


/**
 * Function to execute core business logic based on input data
 * @returns {object} - id and array of top earner's transactionId 
 */
const processTransactions = async function processTransactions() {
    let data = await fetchTask();

    let filteredByDate = data.transactions.filter(item => filterByPastYears(item, 1));
    let employeeTotals = calculateEmployeeTotals(filteredByDate);
    let topEarnerId = findTopEarner(employeeTotals);
    let alphaTransactionIDs = getAlphaTransactions(filteredByDate, topEarnerId);

    return { "id": data.id, "result": alphaTransactionIDs };
}

/**
 * Function to filter by past year
 * @param {object} data 
 * @param {number} yearsAgo 
 * @returns {object} filtered data
 */
const filterByPastYears = (data, yearsAgo = 1) => {
    const timestampYear = new Date(data.timeStamp).getUTCFullYear();
    const currentYear = new Date().getFullYear();

    if (currentYear - yearsAgo === timestampYear) {
        return data;
    }
};

/**
 * Function to calculate total amounts for each employee
 * @param {object} transactions 
 * @returns {object} employee id and total amount
 */
const calculateEmployeeTotals = (transactions) => {
    let employeeTotals = {};

    transactions.forEach(transaction => {
        if (transaction.amount && transaction.employee && transaction.employee.id) {
            employeeTotals[transaction.employee.id] ??= 0; // Initialize if not already set
            employeeTotals[transaction.employee.id] += transaction.amount;
        } else {
            console.warn(`Skipping invalid transaction: ${JSON.stringify(transaction)}`);
        }
    });
    return employeeTotals;
};

/**
 * Function to get top earner
 * @param {object} employeeTotals 
 * @returns {string} id of the top earner for the given year
 */
const findTopEarner = employeeTotals => {
    let [topEarner, maxTotal] = [null, 0];

    for (const [id, total] of Object.entries(employeeTotals)) {
        if (typeof total === 'number' && total > maxTotal) {
            [topEarner, maxTotal] = [id, total];
        }
    }
    return topEarner;
};

/**
 * Function to get alpha transaction Ids
 * @param {object} transactions 
 * @param {string} topEarnerId 
 * @returns {array} of transaction Ids
 */
const getAlphaTransactions = (transactions, topEarnerId) => {
    if (!(topEarnerId && Array.isArray(transactions))) return [];

    return transactions
        .filter(transaction =>
            transaction?.employee?.id === topEarnerId &&
            transaction.type === 'alpha' &&
            transaction.transactionID
        )
        .map(transaction => transaction.transactionID);
};

module.exports = {
    processTransactions
}