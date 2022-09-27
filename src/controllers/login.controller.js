const LoginService = require('../services/login.service');

const loginHandler = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Some required fields are missing');
    err.status = 400;
    throw err;
  }

  const user = LoginService.loginHandler(email, password);
  if (!user) {
    const err = new Error('Invalid fields');
    err.status = 400;
    throw err;
  }

  res.status(200).json({ token: '' });
};

module.exports = {
  loginHandler,
};