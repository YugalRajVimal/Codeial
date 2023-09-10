// users_controller
// module.exports.action = function(request,response){
//     // return response.end('<h1>Express is up for Codeial - Users Controllers</h1>')
    
// }

const users = require('../models/user')

module.exports.profile = async (req, res)=>{
    if(req.cookies.user_id){
        try {
            let user = await users.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile', {
                    title: 'User Profile',
                    name: user.name
                });
            }
            return res.redirect('/users/sign-in');
        } catch (error) {
            console.log("Error in accessing profile");
        }
    }
    else{
        return res.redirect('/users/sign-in');
    }
};

// Render the Sign Up page
module.exports.signUp = async (req,res)=>{

    if(req.cookies.user_id){
        try {
            let user = await users.findById(req.cookies.user_id);
            if(user){
                return res.redirect('/users/profile');
            }
            return res.render('user_sign_up',{
                title:"Codeial" | "SignUp"
            });
        } catch (error) {
            console.log("Error in SignUp");
        }
    }
    else{
        return res.render('user_sign_up',{
            title:"Codeial" | "SignUp"
        });
    }

    // return res.render('user_sign_up',{
    //     title:"Codeial" | "SignUp"
    // });
};

// Render the Sign In page
module.exports.signIn =async (req,res)=>{
    if(req.cookies.user_id){
        try {
            let user = await users.findById(req.cookies.user_id);
            if(user){
                return res.redirect('/users/profile');
            }
            return res.render('user_sign_in',{
                title:"Codeial-SignIn"
            });
        } catch (error) {
            console.log("Error in SignIn");
        }
    }
    else{
        return res.render('user_sign_in',{
            title:"Codeial-SignIn"
        });
    }
    
};

module.exports.signOut =async (req,res)=>{

    if(req.cookies.user_id){
        try {
            let user =await users.findById(req.cookies.user_id);

            if(user){
                res.clearCookie('user_id');
                return res.redirect('/users/sign-in');
            }
        } catch (error) {
            console.log("Error in Sign Out",error);
        }
    }
    else{
        return res.redirect('/users/sign-in');
    }
    
};

// Get the sign up data
module.exports.create = async function(req,res){

    // Check whether both password and confirm_password are same or not
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        //Find user if already exist or not
        let user = await users.findOne({email:req.body.email});
            //User not exist
            if(!user){
                await users.create(req.body);
                //OR
                // await users.insertMany({
                //     email:req.body.email,
                //     password:req.body.password,
                //     name:req.body.name 
                // });

                console.log("New user's account created")
                return res.redirect('/users/sign-in');
            }
            //User exist
            else{
                console.log("Account already exist ")
                return res.redirect('back');
            }
    } catch (error) {
        console.log("Error in finding user in DB");
        return;
    }

}

module.exports.createSession = async function(req,res){
   
    try {
        //Find User
        let user = await users.findOne({email:req.body.email});

        //User not exist
        if(!user){
            console.log("User does not exist");
            return res.redirect('back');
        }
        else{
            if(user.password === req.body.password){
                res.cookie('user_id',user._id);
                return res.redirect('/users/profile');
            }
        }
    } catch (error) {
        console.log("Error in finding user from DB")
        return;
    }
}

