const posts = require("../models/post");
const comments = require("../models/comment");

// const ObjectId = require("mongodb").ObjectId;

module.exports.createPost = async function (req, res) {
  console.log("Post Creating");
  try {
    // console.log("Request User",req.user);
    console.log(req.body);
    let post = await posts.create({
      content: req.body.content,
      image: req.body.image,
      // user:await req.user._id  //(Not Working - Doubt)
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
    if (post[0].user.toString() == res.locals.user.id) {
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
