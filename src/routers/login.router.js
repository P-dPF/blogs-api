const express = require('express');

const { LoginController } = require('../controllers');

const router = express.Router();

router.get('/', LoginController.loginHandler);

module.exports = router;