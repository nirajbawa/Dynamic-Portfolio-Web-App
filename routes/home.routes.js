const express = require("express");
const router = new express.Router();
const Home = require("../controllers/home.controllers");
const contactForm = require("../controllers/contactForm.forms.adminPanel.controller");


// routes and controller

let HomeControllers = new Home();


router.get("/", HomeControllers.getView.bind(HomeControllers));
router.post("/", HomeControllers.postHome.bind(HomeControllers));

let contactFormControllers = new contactForm();

router.post("/contact", contactFormControllers.PostForm.bind(contactFormControllers));





module.exports = router;