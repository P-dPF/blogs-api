const express = require('express');

const { PostController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.use(validateToken);
router.get('/', PostController.getAll);
router.get('/search', (PostController.searchByQueryTerm));
router.get('/:id', PostController.getById);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.deleteById);
router.post('/', PostController.create);

module.exports = router;