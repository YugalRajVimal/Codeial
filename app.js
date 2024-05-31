const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;

//Setting up Layouts using express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

//Connecting to the database
const db = require("./config/mongoose");

//Used for Session Cookie Management
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//For storing sessions in MongoDB
const MongoStore = require("connect-mongo");

//Middleware for compiling SASS/SCSS files to CSS
const sassMiddleware = require("node-sass-middleware");

//Middleware for Flash Messages
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//Middleware for SASS/SCSS compilation
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "./assets")));

// Making the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// Using express-ejs-layouts for layout management
app.use(expressLayouts);

// Extract styles and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Setting up the view engine as EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Session management configuration
app.use(
  session({
    name: "codeial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/codeial-db",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err);
      }
    ),
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in response locals
app.use(passport.setAuthenticatedUser);

// Middleware for flash messages
app.use(flash());
app.use(customMware.setFlash);

// Using routes from the routes directory
app.use("/", require("./routes"));

// Starting the server
app.listen(8080, function (error) {
  if (error) {
    console.log(`Error in running the server : ${error}`);
  }
  console.log(`Server is running on Port : ${port}`);
});
