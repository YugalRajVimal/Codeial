const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsController = require('../controllers/posts_controller');
const { uploadPost } = require('../config/fileUploadMiddleware');

router.post('/create-post',passport.checkAuthentication,uploadPost.single('postImg'),postsController.createPost);
router.get('/delete-post',passport.checkAuthentication,postsController.deletePost);

module.exports = router;