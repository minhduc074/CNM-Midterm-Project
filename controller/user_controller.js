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
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": "Login success" }
        res.end(JSON.stringify(body));
    }).catch(function() {

        console.log("401");
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
    console.log(username + " " + password);

    var db_password = user_db.find_user(username);
    if (db_password === null) {
        var newuser = {
            "username": username,
            "password": password
        }

        user_db.push(newuser);

        fs.writeFile('./db/users.json', JSON.stringify(user_db), function(err) {
            if (err) return console.log(err);
        });

        res.writeHead(200, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": "Register success" };
        res.end(JSON.stringify(body));
    } else {
        res.writeHead(405, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": "User already exits" };
        res.end(JSON.stringify(body));
    }
})


module.exports = user;