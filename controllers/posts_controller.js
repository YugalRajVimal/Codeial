const posts = require("../models/post");
const comments = require("../models/comment");
const path = require("path");
const fs = require("fs");

module.exports.createPost = async function (req, res) {
  console.log("Post Creating",req.body.content);
  console.log("Post Creating",req.file.filename);
  try {
    if(!req.file){
      console.log("File not uploaded");
      return res.redirect("back");
    }
    const fileName = req.file.filename;
    let post = await posts.create({
      content: req.body.content,
      image: '/uploads/posts/'+ fileName,
      user: await res.locals.user._id,
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!",
      });
    }
    return res.redirect("back");
  } catch (error) {
    console.log("Error in creating Post :", error);
    return;
  }
};

module.exports.deletePost = async function (req, res) {
  try {
    let post = await posts.find({ _id: req.query.id });
    if (post[0].user.toString() == res.locals.user.id){
      const filePath = path.join(__dirname, "..", post[0].image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      await post[0].deleteOne({ _id: req.query.id });
      await comments.deleteMany({ post: req.query.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.query.id,
          },
          message: "Post Deleted",
        });
      }
      console.log("Post deleted successfully");
    } else {
      console.log(
        "You are not authorised to delete this post | Post not Available"
      );
    }
    return res.redirect("back");
  } catch (error) {
    console.log("Error in deleting Post", error);
    return;
  }
};

