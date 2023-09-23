const passport = require('passport');

const LocalStrategy =  require('passport-local').Strategy;

const users = require('../models/user');

passport.use(new LocalStrategy({
        usernameField:'email'
    },
    async function(email,password,done){
        try {
            let user =await users.findOne({email:email});
            if(!user || user.password != password){
                console.log("Invalid User/Password");
                return done(null,false);
            }
            return done(null,user);
        } catch (error) {
            console.log("Error in finding user");
            return done(error);
        }
}));


//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    // process.nextTick(function() {
    //     return done(null, {
    //       id: user.id
    //     });
    //   });
    return done(null,user.id); 
});

//Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    try {
        let user = users.findById(id);
        return done(null,user);
    } catch (error) {
        console.log("Error in finding user");
        return done(error);
    }


    // users.findById(id,function(error,user){
    //     if(error){
    //         console.log("Error in finding user");
    //         return done(error);
    //     }
    //     return done(null,user);
    // })
});

passport.checkAuthentication = function(req,res,next){
    // If user is signed in then pass on the request to the next function (Controller's Action)
    if(req.isAuthenticated()){
        return next();
    }

    // If the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser =async function(req,res,next){
    if(req.isAuthenticated()){
        // rew.user conatin the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user =await req.user;
    }
    next();
}

module.export = passport;