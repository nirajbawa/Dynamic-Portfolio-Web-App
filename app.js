// dotenv config
require("dotenv").config();

// import packages
const express = require("express");
const path = require("path");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 5000;

// define view engine settings
app.set("view engine", "ejs");

const templatesPath = path.join(__dirname, "/templates/views/");
app.set("views", templatesPath);

// serve static files
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

//middlewares 

app.use(fileUpload({
    useTempFiles:true
}));

// body parser

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:2592000000}
}));

// Database connection
require("./models/DB_Config.modes");


// import routes
const Home = require("./routes/home.routes");
const adminLogin = require("./routes/adminAuth.routes");
const adminDashboard = require("./routes/adminPanel.routes");
const pageNotFound = require("./routes/404.routes");


// admin user auth middleware
const adminUserAuth = require("./middlewares/adminUserAuth.middleware");
app.use("/admin/panel", adminUserAuth);

// routes

app.use(Home);
app.use("/admin/",adminLogin);
app.use("/admin/panel", adminDashboard);
app.use(pageNotFound);

module.exports = app;