const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comment_controller');

router.post('/create-comment',commentController.createComment);

router.get('/delete-comment',commentController.deleteComment);

module.exports = router;