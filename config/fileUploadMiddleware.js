const multer = require('multer');

const storagePost = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./uploads/posts/");
    },
    filename:(req, file, cb)=>{
        console.log(file.originalname);
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const uploadPost = multer({ storage:storagePost });
module.exports.uploadPost = uploadPost;

let storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/users/avatars/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
  
const uploadAvatar = multer({ storage:storageAvatar });
module.exports.uploadAvatar = uploadAvatar;