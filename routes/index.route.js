const express = require("express");
const router = express.Router();
const { contact, home, about } = require("../controllers/index.controller");

// define the home page route
router.get("/home", (req, res) => home(req, res));
// define the about route
router.get("/about", (req, res) => about(req, res));
router.get("/contactus", (req, res) => contact(req, res));
module.exports = router;
