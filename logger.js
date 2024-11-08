const log = (level, message, error) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${level}: ${message}`, error || '');
  };
  
  module.exports = {
    info: (message) => log('INFO', message),
    warn: (message) => log('WARN', message),
    error: (message, error) => log('ERROR', message, error),
  };
  