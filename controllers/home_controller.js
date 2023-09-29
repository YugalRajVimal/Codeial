const post_list = require('../models/post')


module.exports.home =async function(request,response){
    try {
        let posts = await post_list.find({})
        .sort('-createdAt') // this will sort a/q to time , if 1, 2, 3 --> 3 2 1 1st created 1 so it's last
        .populate("user"); // populate the `user` field with the corresponding user(Collection Name) document

        return response.render('home',{
            "title":"Codeial",
            "post":posts
        });

    } catch (error) {
        console.log("Error in fetching posts from DB",error);
        return;
    }
    
}





// module.exports.home = async (req, res) => {
//     // console.log(req.cookies);
//     // res.cookie('user_id',25);
  
//     try {
//       // populate the user of each post ?
//       let posts = await post_list.find({})
//         .sort('-createdAt') // this will sort a/q to time , if 1, 2, 3 --> 3 2 1 1st created 1 so it's last
//         .populate("user") // populate the `user` field with the corresponding user(Collection Name) document
//       let users = await user_list.find({});
  
//       return res.render("home", {
//         title: "Codeail | Home",
//         post: posts
//       });
//     } catch (err) {
//       console.log("Error", err);
//       return;
//     }
//   };