// users_controller
// module.exports.action = function(request,response){
//     // return response.end('<h1>Express is up for Codeial - Users Controllers</h1>')
    
// }

module.exports.profile = (req, res)=>{
    return res.render('user_profile', {
        title: 'User Profile'
    });
};

// Render the Sign Up page
module.exports.signUp = (req,res)=>{
    return res.render('user_sign_up',{
        title:"Codeial" | "SignUp"
    });
};

// Render the Sign In page
module.exports.signIn = (req,res)=>{
    return res.render('user_sign_in',{
        title:"Codeial" | "SignIn"
    });
};

// Get the sign up data
module.exports.create = function(req,res){
    //To Do
}