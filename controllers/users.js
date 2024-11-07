const User = require("../models/users");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

// module.exports.createUser = async (req, res) => {
//   try {
//     const { email, username, password } = req.body;
//     const user = new User({ email, username });
//     const registeredUser = await User.register(user, password);
//     req.login(registeredUser, (err) => {
//       if (err) return next(err);
//       req.flash("success", "Welcome to Flashy!");
//       res.redirect("/flashcards");
//     });
//   } catch (e) {
//     req.flash("error", e.message);
//     console.log("error ocurred")
//   }
// };

module.exports.createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    //validates user and email
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      req.flash("error", "user or email in use ");
      return res.redirect("/register"); // redirect ok bro(?)
    }

    // creates account
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    // auto login
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Flashy!");
      res.redirect("/flashcards");
    });
  } catch (e) {
    req.flash("error", e.message);
    console.log("error occurred");
    res.redirect("/register");
  }
};


module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.returnTo || "/flashcards";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
};