const express = require('express');
const router = express.Router();
const passport = require('passport');
const likeController = require('../controllers/like_controller');   

router.post('/togglelike-posts',passport.checkAuthentication,likeController.toggleLikePosts);

module.exports = router;
