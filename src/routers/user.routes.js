const express = require('express');

const { UserController } = require('../controllers');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUSer);

module.exports = router;