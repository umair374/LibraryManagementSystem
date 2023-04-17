const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index");
const bookRoutes = require("./routers/book.routers");
const loginRoutes = require("./routers/login.routers");
const userRoutes = require("./routers/user.router");
const indexRoutes = require("./routers/index.routers");
const notfound = require("./middlewares/notFound");


var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use([express.json(), express.static('./public')]);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.use("/",indexRoutes);
app.use("/books", bookRoutes);
app.use("/logins", loginRoutes);
app.use("/users", userRoutes);
app.use("/",notfound);

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRUD Application!" });
});

app.get('*', function(req, res){
  res.send(`The Url you are accessing is invalid ${req.url}`, 404);
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.01:${PORT} .`);
});
