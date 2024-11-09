
/**
 * Filters transactions by specified states and primary work location status.
 * @param {Array<Object>} transactions - Array of transaction objects.
 * @param {Array<string>} states - Array of location states to filter by.
 * @returns {Array<Object>} Array of transactions that match the filter criteria.
 */
function filterTransactionsByLocation(transactions, states) {
    return transactions.filter(transaction =>
        transaction?.location &&
        states.includes(transaction.location.state) &&
        transaction.employee?.location?.primaryWorkLocation === true
    );
}

/**
 * Filters transactions that occurred within the specified number of years from the current date.
 *
 * @param {Array} transactions - An array of transaction objects to filter.
 * @param {number} [years=2] - The number of years to look back from the current date (defaults to 2).
 * @returns {Array} - An array of transactions that occurred within the last 'years' number of years.
 */
const getRecentTransactions = (transactions, years = 2) => {
    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - years);

    return transactions.filter(transaction => new Date(transaction.timeStamp) >= cutoffDate);
};
