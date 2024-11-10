/**
 * Create a response object
 * @param {number} statusCode HTTP status code
 * @param {string} message Response message
 * @returns {Object} Response object
 */
const createResponse = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify({ message }),
});

module.exports = {
  createResponse,
};
