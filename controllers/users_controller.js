const fs = require("fs");
const path = require("path");
const LocalStrategy = require("../config/passport-local-strategy");
const users = require("../models/user");

module.exports.profile = async (req, res) => {
  try {
    let user = await users.findById(req.query.id);
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  } catch (error) {
    console.log("Error in finding user", error);
    return;
  }
};

// Render the Sign Up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial" | "SignUp",
  });
};

// Render the Sign In page
module.exports.signIn = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial-SignIn",
  });
};

// Get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  try {
    let user = await users.findOne({ email: req.body.email });
    try {
      if (!user) {
        await users.create(req.body);
        req.flash("success", "Signed Up Successfully");
        return res.redirect("/users/sign-in");
      } else {
        console.log("Account already exist ");
        return res.redirect("back");
      }
    } catch (error) {
      console.log("Error in finding user in DB");
    }
  } catch (error) {
    console.log("Error in finding user in DB");
    return;
  }
};

module.exports.updateUser = async function (req, res) {
  try {
    const fileName = req.file?.filename;
    const user = await users.findByIdAndUpdate(res.locals.user.id);
    user.name = req.body.name;
    user.email = req.body.email;
    if(req.file){
      if (
        fs.existsSync(path.join(__dirname, "..", user.avatar))
      ) {
        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
      }
      user.avatar = '/uploads/users/avatars/'+ fileName;
    }
    user.save();
    req.flash("success", "Profile");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.flash("success", "Logged Out Successfully");
    return res.redirect("/");
  });
};

module.exports.getUser = async function (req, res) {
  try {
    const userId = req.query.id;
    const user = await users.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteUser = async function (req, res) {
  try {
    console.log(req.query.id);
    await users.findByIdAndDelete(req.params.id);
    req.logout(function (err) {
      if (err) {
        console.log(err);
        return;
      }
      req.flash("success", "User Deleted Successfully");
      return res.redirect("/");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


