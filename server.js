const express = require("express");

const app = express();

const ejs = require("ejs");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");

//connect Mongo
mongoose.connect(
  "mongodb+srv://spurinruk:purinruk311@cluster0.uqxbrql.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

//check whether user logged in?. Have to collect the user session id
global.loggedIn = null;

//controllers
const indexController = require("./controllers/indexController");
const loginController = require("./controllers/loginController");
const registerController = require("./controllers/registerController");
const storeUserController = require("./controllers/storeUserController");
const loginUserController = require("./controllers/loginUserController");
const logoutController = require("./controllers/logoutController");
const homeController = require("./controllers/homeController");

//middleware
const redirectIfAuth = require("./middleware/redirectIfAuth");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
// Configure session middleware
app.use(flash());
app.use(
  expressSession({
    secret: "issecret", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);
app.use("*", (req, res, next) => {
  global.loggedIn = req.session.userId;
  next();
});

// app.use((req, res, next) => {
//   if (req.session.userId) {
//     global.loggedIn = true; // User is logged in
//   } else {
//     global.loggedIn = false; // User is not logged in
//   }
//   res.locals.loggedIn = global.loggedIn; // Set it in res.locals too for use in templates
//   next();
// });

app.set("view engine", "ejs");

//after getting request, invoke controller
app.get("/", indexController);
app.get("/home", authMiddleware, homeController);

app.get("/login", redirectIfAuth, loginController);
app.get("/register", redirectIfAuth, registerController);
app.post("/user/register", redirectIfAuth, storeUserController);
app.post("/user/login", redirectIfAuth, loginUserController);
app.get("/logout", logoutController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
