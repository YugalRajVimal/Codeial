
const post = require('../models/post');

module.exports.createPost = async function(req,res){
    console.log("Post Creating");
    try {
        // console.log("Request User",req.user);
        await post.create({
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
