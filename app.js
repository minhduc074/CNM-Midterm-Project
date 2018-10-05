var express = require('express');
var app = express();
var user = require("./controller/user_controller");
var products = require("./controller/product_controller");
var ticket = require("./controller/ticket_controller");
var morgan = require('morgan');
app.use(morgan('dev'));

morgan(function(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
})

var https = require("http").createServer(app);
https.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.post("/login", user);
app.post("/register", user);

app.get("/products/:key", products);
app.get("/products", products);
app.post("/products", products);

app.post("./ticket/:username/:password", ticket);
app.get("./ticket/:username/:password", ticket);