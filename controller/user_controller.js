var express = require('express');
var user = express.Router();

var bodyParser = require('body-parser');
user.use(bodyParser.json());

var user_db = require("../model/users_model");


user.post("/login/", function(req, res) {
    var body = req.body;
    console.log(body);
    var username = body.username;
    var password = body.password;

    console.log(username + " " + password);
    user_db.authenticate(username, password).then(function() {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": "Login success" }
        res.end(JSON.stringify(body));
    }).catch(function() {

        res.writeHead(401, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": "incorrect username/password" }
        res.end(JSON.stringify(body));
    });

})

user.post("/register/", function(req, res) {
    var body = req.body;
    console.log(body);
    var username = body.username;
    var password = body.password;
    console.log("user.post" + username + " " + password);

    user_db.add_new(username, password).then(function(resolve) {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(function(reject) {
        res.writeHead(405, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": reject };
        res.end(JSON.stringify(body));
    })
})


module.exports = user;