const express = require('express');

const { UserController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.post('/', UserController.createUser);

router.use(validateToken);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

module.exports = router;