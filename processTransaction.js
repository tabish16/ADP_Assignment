const axios = require("axios");
const logger = require('./logger');
const fetchTask = require('./fetchTask');

/**
 * Processes transactions to identify top earner's transactions within the past year.
 * @async
 * @function processTransactions
 * @returns {Promise<{id: string, result: string[]}>} Object containing the ID and an array of the top earner's "alpha" transaction IDs.
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
 * Filters a transaction by checking if it occurred in the specified past year.
 * @function filterByPastYears
 * @param {Object} data - A transaction object containing a timestamp.
 * @param {number} yearsAgo - Number of years ago to check from the current year (default is 1).
 * @returns {Object} The transaction object if it matches the filter.
 */
const filterByPastYears = (data, yearsAgo = 1) => {
    const timestampYear = new Date(data.timeStamp).getUTCFullYear();
    const currentYear = new Date().getFullYear();

    if (currentYear - yearsAgo === timestampYear) {
        return data;
    }
};

/**
 * Calculates the total transaction amount for each employee.
 * @function calculateEmployeeTotals
 * @param {Object[]} transactions - Array of transaction objects.
 * @returns {Object} An object with employee IDs as keys and their total transaction amounts as values.
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
 * Finds the employee with the highest total transaction amount.
 * @function findTopEarner
 * @param {Object} employeeTotals - An object with employee IDs as keys and their total transaction amounts as values.
 * @returns {string} The ID of the top-earning employee.
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
 * Retrieves the transaction IDs of all "alpha" transactions made by the top earner.
 * @function getAlphaTransactions
 * @param {Object[]} transactions - Array of transaction objects.
 * @param {string} topEarnerId - ID of the top-earning employee.
 * @returns {string[]} Array of "alpha" transaction IDs made by the top earner.
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