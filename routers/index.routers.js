const express = require("express");
const router = express.Router();

const {Home,About,Contact}= require ("../controllers/indexController");

const {UserRegister,UserLogin,UserUpdate,UserProfile,UserChPassward,UserRenew,UserHistory,UserOverdue,UserViewFine,UserPayFine}= require ("../controllers/userController");



router.get("/",(req,res) =>
{
    Home(req,res);
});


router.get("/about",(req,res) =>
{
    About(req,res);
});

router.get("/contactus",(req,res) =>
{
    Contact(req,res);
});

///////////////////////////////////////////////////

router.get("/users/register",(req,res) =>
{
    UserRegister(req,res);
});



router.get("/users/login",(req,res) =>
{
    UserLogin(req,res);
});

router.get("/users/:userId/update",(req,res) =>
{
    UserUpdate(req,res);
});

router.get("/users/:userId/profile", (req, res) => {
    UserProfile(req,res);
  });

  router.get("/users/:userId/change-passward", (req, res) => {
    UserChPassward(req,res);
  });

  router.get("/users/:userId/borrow-history", (req, res) => {
    UserHistory(req,res);
  });

  router.get("/users/:userId/borrow-history/:itemId/renew", (req, res) => {
    UserRenew(req,res);
  });

  router.get("/users/:userId/overdue-books", (req, res) => {
    UserOverdue(req,res);
  });

  router.get("/users/:userId/fines", (req, res) => {
    UserViewFine(req,res);
  });

  router.get("/users/:userId/pay-fines", (req, res) => {
    UserPayFine(req,res);
  });

  router.get('*', function(req, res){
    res.status(404).send(`The Url you are accessing is invalid ${req.url}`);
  });
 
module.exports = router;