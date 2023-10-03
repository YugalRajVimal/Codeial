
const posts = require('../models/post');
const comments = require('../models/comment');

// const ObjectId = require("mongodb").ObjectId;


module.exports.createPost = async function(req,res){
    console.log("Post Creating");
    try {
        // console.log("Request User",req.user);
        await posts.create({
            content: req.body.content,
            // user:await req.user._id  //(Not Working - Doubt)
            user:await res.locals.user._id  
        });
        return res.redirect('back');
    } catch (error) {
        console.log("Error in creating Post :",error);
        return;
    }
}

module.exports.deletePost = async function(req,res){
    try {
        let post =await posts.find({_id : req.query.id});
        // console.log(post[0].user.toString()," ",res.locals.user.id);
        if(post[0].user.toString() == res.locals.user.id){
            await post[0].deleteOne({_id : req.query.id});
            await comments.deleteMany({post: req.query.id});

            console.log("Post deleted successfully");
        }
        else{
            console.log("You are not authorised to delete this post | Post not Available");
        }
        return res.redirect('back');
    } catch (error) {
        console.log("Error in deleting Post",error);
        return;
    }
}
