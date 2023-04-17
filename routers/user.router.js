const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const users = require("../controllers/user.controller.js");

var router = require("express").Router();

router.post("/", users.create);

router.get("/", users.findAll);

router.get("/filterByNameAndFine", users.filterByNameAndFine);

router.get("/filterByName", users.filterByName);

router.get("/:id", users.findOne);

router.put("/:id", users.update);

router.delete("/:id", users.delete);

router.delete("/", users.deleteAll);

router.get('/:id/fine',users.findOneFine);

router.post('/validate',users.checkuser);

router.post =('/login',users.login);
  
router.get('*', function(req, res){
    res.status(404).send(`The Url you are accessing is invalid ${req.url}`);
  });

module.exports = router;
