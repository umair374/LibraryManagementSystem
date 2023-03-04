const express = require("express");
const app=express();
const indexRouters = require("./routers/index.routers");
app.use("/",indexRouters);

app.listen("3000");
