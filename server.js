const express = require("express");
const app=express();
const indexRouters = require("./routers/index.routers");
const { user } = require("./models/userModel");


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'umair'
});
 
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected ");
});

connection.query(
  "SELECT * FROM users ",
  function (error, results, fields) {
    if (error) throw error;
    res = results;
    console.log("Registered users : ", results);
  }
);

connection.end();
// user.findAll().then((results) => {
//   console.log("Registered users : ", results);
// }).catch((error) => {
//   console.error('Failed to retrieve users : ', error);
// });




app.use("/",indexRouters);

app.listen("3000");
