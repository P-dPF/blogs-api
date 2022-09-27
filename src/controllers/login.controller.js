const LoginService = require('../services/login.service');

const loginHandler = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = LoginService.loginHandler(email, password);
  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  res.status(200).json({ token: '' });
};

module.exports = loginHandler;