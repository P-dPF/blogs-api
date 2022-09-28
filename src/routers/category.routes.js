const express = require('express');

const { categoryController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.use(validateToken);
router.post('/', categoryController.createCategory);

module.exports = router;