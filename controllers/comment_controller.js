const comments = require('../models/comment');
const posts = require('../models/post');

module.exports.createComment = async function(req,res){
    try {
        let post_id = req.query.id;
        let curr_post =await posts.findById(post_id);
        if(curr_post){
            try {
                let comment = await comments.create({
                    content: req.body.content,
                    user:await res.locals.user._id,
                    post:post_id
                });
                curr_post.comment.push(comment);
                curr_post.save();
            } catch (error) {
                console.log("Error in creating comments",error);
            }
        }
        return res.redirect('back');
    } catch (error) {
        console.log("Post not found");
        console.log('Error in creating Comment');
        return res.redirect('back');
    }
}

module.exports.deleteComment = async function(req,res){
    try {
        let comment =await comments.find({_id: req.query.id});
        let post = await posts.find({_id: comment[0].post});
        if(comment[0].user.toString() == res.locals.user.id  || post[0].user.toString() == res.locals.user.id ){
            await comments.deleteOne({_id:req.query.id});
            await posts.findByIdAndUpdate(post[0]._id,{ $pull:{comment:req.query.id}});
        }
        else{
            console.log("You are not allowed to delete this comment");
        }
        res.redirect('back');
    } catch (error) {
        console.log('Error in deleting comment.',error);
    }
}
