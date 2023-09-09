const express = require("express");
const app = express();

const port = 8001;

const db = require("./config/mongoose");

//Setting Layouts
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expressLayouts);
//Extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use('/',require("./routes"));

app.set('view engine','ejs');
app.set('views','./views')


app.listen(port,function(error){
    if(error){
        //console.log("Error in running the server : ",error);
        console.log(`Error in running the server : ${error}`);
    }
    console.log(`Server is running on Port : ${port}`);
});
