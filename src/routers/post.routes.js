const express = require('express');

const { PostController } = require('../controllers');

const router = express.Router();

router.get('/', PostController.getAllPosts);

module.exports = router;