var express = require('express');
var app = express();
var user = require("./controller/user_controller");
var products = require("./controller/product_cotroller")

var https = require("http").createServer(app);
https.listen(3000);

app.get("/login/:username/:password", user);
app.get("/register/:username/:password", user);

app.get("/products/:id", products);
app.get("/products", products);