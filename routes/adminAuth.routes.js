const express = require("express");
const router = new express.Router();
const AdminSignIn = require("../controllers/adminSignIn.controller");
const adminSingUp = require("../controllers/adminSignUp.controller");

// installation middleware

const installation_middleware = require("../middlewares/installation.middleware");

router.use("/signup", installation_middleware);

// routes and controller

let AdminSignInController = new AdminSignIn();

router.get("/signin", AdminSignInController.getSignin.bind(AdminSignInController));
router.post("/signin", AdminSignInController.postSignin.bind(AdminSignInController));
router.post("/signin/otp", AdminSignInController.sendOtpAgain.bind(AdminSignInController));
router.get("/signout", AdminSignInController.signOut.bind(AdminSignInController));
router.get("/forgotpassword", AdminSignInController.getForgotPassword.bind(AdminSignInController));
router.post("/forgotpassword", AdminSignInController.postForgotPassword.bind(AdminSignInController));
router.get("/forgotpassword/:id/:uid", AdminSignInController.getForgotPasswordReset.bind(AdminSignInController));
router.post("/forgotpassword/:id/:uid", AdminSignInController.postForgotPasswordReset.bind(AdminSignInController));


let AdminSignUpController = new adminSingUp();

router.get("/signup", AdminSignUpController.getSignup.bind(AdminSignUpController));
router.post("/signup", AdminSignUpController.postSignup.bind(AdminSignUpController));
router.post("/signup/otp", AdminSignUpController.sendOtpAgain.bind(AdminSignUpController));



module.exports = router; 