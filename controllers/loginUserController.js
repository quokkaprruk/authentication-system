// const bcrypt = require("bcrypt");

// const User = require("../models/User");

// module.exports = (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ email: email }).then((user) => {
//     console.log(user);
//     if (user) {
//       let cmp = bcrypt.compare(password, user.password).then((match) => {
//         if (match) {
//           req.express.userId = user._id; //user._id from mongo
//           res.redirect("/");
//         } else {
//           res.redirect("/login");
//         }
//       });
//     } else {
//       res.redirect("/login");
//     }
//   });
// };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // User authentication succeeded
        const userId = user._id;

        // Store the userId in the session (if you're using sessions)
        req.session.userId = userId;

        // Create a JWT token with the userId
        const token = jwt.sign({ userId }, "issecret"); // Replace 'your-secret-key' with your actual secret key

        // Send the token as a response or use it as needed
        //res.json({ token, loggedIn: true, redirectTo: "/" });
        console.log({ token, loggedIn: true });
        res.redirect("/home");
      } else {
        // Password does not match, redirect to login
        res.redirect("/login");
      }
    } else {
      // User not found, redirect to login
      res.redirect("/login");
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = loginUserController;
