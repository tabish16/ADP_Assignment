const processTransaction = require("./processTransaction");
const submitTask = require("./submitTask");
const logger = require('./logger');
const http = require('http');

async function main(res) {
    try {
        // Get data Id and top earner transaction Ids array
        const getReponse = await processTransaction.processTransactions();

        // Post the response
        const postResponse = await submitTask.submitResult(getReponse);
        console.log(postResponse);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task processed successfully', postResponse }));

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      main(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });
  
  // Listen on localhost:3000
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });