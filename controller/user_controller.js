var express = require('express');
var user = express.Router();
var fs = require('fs');
var user_db = JSON.parse(fs.readFileSync('./db/users.json', 'utf8'));

function find_user(username) {
    for (var i = 0; i < user_db.length; i++) {
        if (user_db[i].username.toString() === username)
            return user_db[i].password;
    }
    return null;
}

function authenticate(username, password) {
    var db_password = find_user(username);
    if (db_password === null)
        return false;
    if (db_password.toString() === password.toString())
        return true;
    else return false;
}

user.get("/login/:username/:password", function(req, res) {
    var username = req.params.username;
    var password = req.params.password;

    console.log(username + " " + password);
    if (!authenticate(username, password)) {
        console.log("401");
        res.writeHead(401, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": "incorrect username/password" }
        res.end(JSON.stringify(body));
    } else {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        var body = { "username": username, "reason": "Login success" }
        res.end(JSON.stringify(body));
    }

})

user.get("/register/:username/:password", function(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    console.log(username + " " + password);

    var db_password = find_user(username);
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