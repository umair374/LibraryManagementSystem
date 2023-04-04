const books = require("../controllers/book.controller.js");

var router = require("express").Router();

router.post("/", books.create);

router.get("/", books.findAll);

router.get("/published", books.findAllPublished);

router.get("/:id", books.findOne);

router.put("/:id", books.update);

router.delete("/:id", books.delete);

router.delete("/", books.deleteAll);

router.get('*', function(req, res){
    res.status(404).send(`The Url you are accessing is invalid ${req.url}`);
  });

module.exports = router;
