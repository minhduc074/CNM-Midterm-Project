var express = require('express');
var app = express();
var user = require("./controller/user_controller");
var products = require("./controller/product_controller");
var ticket = require("./controller/ticket_controller");
var morgan = require('morgan');
app.use(morgan('dev'));


var https = require("http").createServer(app);
https.listen(3000);

app.get("/login", user);
app.post("/register", user);

app.get("/products/:id", products);
app.get("/products", products);

app.post("./ticket/:username/:password", ticket);
app.get("./ticket/:username/:password", ticket);