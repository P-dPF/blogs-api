const express = require('express');

const { categoryController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.use(validateToken);
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;