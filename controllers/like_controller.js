const likes = require("../models/like");
const posts = require('../models/post');

module.exports.toggleLikePosts = async function (req, res) {
    try {
        let post_id = req.query.id;
        let curr_post =await posts.findById(post_id);
        if(curr_post){
            try {
                let user_id = await res.locals.user._id;
                let prevLike = await likes.findOne({
                    user:user_id,
                    post:post_id});
                if(prevLike){
                    await likes.findByIdAndDelete(prevLike._id);
                    curr_post.like.pull(prevLike._id);
                    curr_post.save();
                }
                else{
                    let like = await likes.create({
                        liked: true,
                        user:user_id,
                        post:post_id
                    })
                    curr_post.like.push(like);
                    curr_post.save();
                }
                return res.redirect('back');
            } catch (error) {
                console.log("Error in toggling Like",error);
                return res.redirect('back');
            }
        }
        return res.redirect('back');
    } catch (error) {
      console.log("Error in toggling Like ", error);
      return res.redirect('back');
    }
  }