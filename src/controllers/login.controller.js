const UserService = require('../services/user.service');
const { generateToken } = require('../middlewares/generateToken');

const isBodyValid = (email, password) => email && password;

const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!isBodyValid(email, password)) {
      return next({ status: 400, message: 'Some required fields are missing' });
    }
    const user = await UserService.getUserByEmail(email);
    if (!user || user.password !== password) {
      return next({ status: 400, message: 'Invalid fields' });
    }
    
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginHandler,
};