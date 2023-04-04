
const logins = require("../controllers/loginController.js");

var router = require("express").Router();

router.post("/", logins.create);

router.get("/", logins.findAll);

router.get("/:id", logins.findOne);

router.put("/:id", logins.update);

router.delete("/:id", logins.delete);

router.delete("/", logins.deleteAll);

router.get('*', function(req, res){
    res.status(404).send(`The Url you are accessing is invalid ${req.url}`);
  });
module.exports = router;
