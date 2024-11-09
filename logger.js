/**
 * Logs messages to the console with a timestamp, log level, and optional error details.
 * 
 * @param {string} level - The log level (e.g., 'INFO', 'WARN', 'ERROR').
 * @param {string} message - The message to log.
 * @param {Error|string} [error] - An optional error object or message to log alongside the message.
 */

const log = (level, message, error) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, error || '');
};


module.exports = {
  info: (message) => log('INFO', message),
  warn: (message) => log('WARN', message),
  error: (message, error) => log('ERROR', message, error),
};
