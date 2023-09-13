const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8001;
//Setting Layouts
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");
//Used for Session Cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//Extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views')

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require("./routes"));

app.listen(port,function(error){
    if(error){
        //console.log("Error in running the server : ",error);
        console.log(`Error in running the server : ${error}`);
    }
    console.log(`Server is running on Port : ${port}`);
});
