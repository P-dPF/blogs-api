const express = require('express');

const { UserController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.post('/', UserController.create);
router.use(validateToken);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.delete('/me', UserController.deleteById);

module.exports = router;