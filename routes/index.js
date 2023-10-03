const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Home Router is Loaded");

router.get('/',homeController.home)
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//for any further routes acces from here 
//router.use( '/routerName' , require(./routerFile));
//http://localhost:8001/routerName/functionName

module.exports = router;