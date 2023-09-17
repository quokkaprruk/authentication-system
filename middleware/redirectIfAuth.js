// module.exports = (req, res, next) => {
//   //   if (req.session.userId) {
//   //     return res.redirect("/");
//   //   }
//   global.loggedIn = req.session.userId;
//   if (loggedIn === "true") {
//     return res.redirect("/");
//   }

//   next();
// };

module.exports = (req, res, next) => {
  if (req.session.userId) {
    // If the user is already logged in, redirect to the home page
    return res.redirect("/");
  }

  // If the user is not logged in, allow them to proceed
  next();
};
