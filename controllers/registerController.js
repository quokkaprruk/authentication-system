// module.exports = (req, res) => {
//   res.render("register", {
//     errors: req.flash(validationErrors),
//   }); //for register.ejs
// };

module.exports = (req, res) => {
  let email = "";
  let password = "";
  let data = req.flash("data");

  if (typeof data != "undefined") {
    email = data.email;
    password = data.password;
  }

  const validationErrors = req.flash("validationErrors"); // Retrieve validation errors from flash
  res.render("register", {
    errors: validationErrors, // Pass validationErrors to the view
    email: email,
    password: password,
  });
};
