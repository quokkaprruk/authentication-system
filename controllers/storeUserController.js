const User = require("../models/User");
module.exports = (req, res) => {
  User.create(req.body)
    .then(() => {
      console.log("Successfully registered");
      res.redirect("/");
    })
    .catch((error) => {
      // console.log(error.errors);
      if (error) {
        const validationErrors = Object.keys(error.errors).map(
          (key) => error.errors[key].message
        );
        req.flash("validationErrors", validationErrors); //store errors value in flash
        req.flash("data", req.body); //store errors value in flash

        return res.redirect("/register");
      }
    });
};
