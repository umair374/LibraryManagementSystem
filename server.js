const express = require("express");
const app = express();
const indexRoutes = require("./routes/index.route");
const adminRoutes = require("./routes/admin.routers");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "adminn",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as ");
});



connection.end();
app.use("/",adminRoutes)
app.use("/", indexRoutes);

app.listen(3000);
