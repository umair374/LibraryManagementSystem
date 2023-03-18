
const logins = require("../controllers/loginController.js");

var router = require("express").Router();

router.post("/", logins.create);

router.get("/", logins.findAll);

router.get("/:id", logins.findOne);

router.put("/:id", logins.update);

router.delete("/:id", logins.delete);

router.delete("/", logins.deleteAll);

module.exports = router;
