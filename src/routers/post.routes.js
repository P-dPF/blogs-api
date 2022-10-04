const express = require('express');

const { PostController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.use(validateToken);
router.get('/', PostController.getAllPosts);
router.get('/search', (PostController.searchByQueryTerm));
router.get('/:id', PostController.getPostById);
router.put('/:id', PostController.updatePostById);
router.delete('/:id', PostController.deleteById);
router.post('/', PostController.createPost);

module.exports = router;