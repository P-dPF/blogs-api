require('dotenv/config');

const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  return token;
};

const validateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return next({ status: 401, message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.getById(decoded.data.userId);
    if (!user) return next({ status: 404, message: 'User not found' });
    
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    next({ status: 401, message: 'Expired or invalid token' });
  }
};

module.exports = {
  generateToken,
  validateToken,
};