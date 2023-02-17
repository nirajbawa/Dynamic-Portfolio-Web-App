const express = require("express");
const router = new express.Router();
const PageNotFound = require("../controllers/404.controllers");

// routes and controller


let pageNotFoundController = new PageNotFound();

router.get("*", pageNotFoundController.getHome.bind(pageNotFoundController));

module.exports = router;