const express = require('express');
const user = express.Router();

const bodyParser = require('body-parser');
user.use(bodyParser.json());

const verifyAccessToken = require('./ticket_controller').verifyAccessToken;

const user_db = require("../model/users_model");
const ticket = require("./ticket_controller");


user.post("/login/", (req, res) => {
    const body = req.body;
    console.log("Post login Entry: " + body);
    const username = body.username;
    const password = body.password;

    const accessToken = ticket.generateAccessToken(user);
    const refreshToken = ticket.generateRefreshToken();
    user_db.authenticate(username, password).then(user => {
        console.log("user_db.authenticate: " + user);
        ticket.generateRefreshToken();
        ticket.updateRefreshToken(username, refreshToken).then(() => {

            res.writeHead(200, { 'Content-Type': 'text/json' });
            const body = {
                "username": username,
                "email": user.email,
                "phone": user.phone,
                "address": user.address,
                "access_token": accessToken,
                "refresh_token": refreshToken
            };
            res.end(JSON.stringify(body));
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('Server Error');
        });
    }).catch(() => {
        console.log("401 incorrect username/password ");
        res.writeHead(401, { 'Content-Type': 'text/json' });
        const body = { "username": username, "reason": "incorrect username/password" };
        res.end(JSON.stringify(body));
    });

});

user.post("/register/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`user.post ${users.username} ${users.password}`);

    user_db.add_new(users).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": reject };
        res.end(JSON.stringify(body));
    })
});

user.put("/address/", verifyAccessToken, (req, res) => {
    const requset = req.body;

    console.log("user.address " + requset.username + " " + requset.address);
    user_db.update_address(requset.username, requset.address).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": requset.username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": requset.username, "reason": reject };
        res.end(JSON.stringify(body));
    })

})

user.get("/address/:username", verifyAccessToken, (req, res) => {
    var username = req.params.username;

    console.log("user.address" + username);
    user_db.get_address(username).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        //console.log(resolve);
        const body = { "username": username, "address": resolve[0].address };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": username, "reason": reject };
        res.end(JSON.stringify(body));
    })

})

module.exports = user;