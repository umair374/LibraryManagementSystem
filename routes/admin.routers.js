const express = require("express");
const router = express.Router();
const { records, profile, login } = require("../controllers/admin.controller");

router.get("/admin/profile", (req, res) => profile(req, res));
router.get("/admin/login", (req, res) => login(req, res));
router.get("/admin/records", (req, res) => records(req, res));
module.exports = router;
