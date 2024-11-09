const processTransaction = require("./processTransaction");
const submitTask = require("./submitTask");
const http = require('http');

/**
 * Handles the main process of fetching and processing transaction data, 
 * then submitting the results. It sends a response back to the client with 
 * the outcome of the task, either a success or an error message.
 * 
 * This function:
 * - Calls `processTransaction.processTransactions()` to fetch the necessary data.
 * - Submits the fetched data using `submitTask.submitResult()`.
 * - Logs the response of the submission.
 * - Returns a JSON response with a success message and the submission result, 
 *   or an error message in case of failure.
 * 
 * @param {http.ServerResponse} res - The HTTP response object used to send 
 * the response back to the client.
 * 
 * @returns {void} - Does not return a value, but sends a response via `res`.
 * 
 * @throws {Error} - If any error occurs during the process, the function catches 
 * the error and sends a 500 status code with the error message.
 */
async function main(res) {
  try {
    
    const getResponse = await processTransaction.processTransactions();

    const postResponse = await submitTask.submitResult(getResponse);
    console.log(postResponse);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Task processed successfully', postResponse }));

  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message }));
  }
}

// Function to handle CORS
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change '*' to a specific domain for production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Create an HTTP server
const server = http.createServer((req, res) => {

  // Enable CORS for all origins
  setCorsHeaders(res);

  // Handle pre-flight request
  if (req.method === 'OPTIONS') return res.writeHead(200).end();

  // Handle main route
  if (req.method === 'GET' && req.url === '/') {
    return main(res);
  }

  // 404 for other routes
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Start server
server.listen(3000, () => console.log('Server running at http://localhost:3000'));
