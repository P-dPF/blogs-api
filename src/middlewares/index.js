const errorHandler = require('./error');
const { generateToken, validateToken } = require('./auth');

module.exports = {
  errorHandler,
  generateToken,
  validateToken,
};