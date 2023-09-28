const post_list = require('../models/post')


module.exports.home =async function(request,response){
    // return response.end('<h1>Express is up for Codeial - Home Controller</h1>')
    try {
        let posts = await post_list.find({}).populate('user').exec();

        return response.render('home',{
            "title":"Codeial",
            "post":posts
        });

    } catch (error) {
        console.log("Error in fetching posts from DB",error);
        return;
    }
    
}

