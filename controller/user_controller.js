const express = require('express');
const user = express.Router();

const bodyParser = require('body-parser');
user.use(bodyParser.json());

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

})

user.post("/register/", (req, res) => {
    const body = req.body;
    console.log(body);
    const username = body.username;
    const password = body.password;
    console.log(`user.post ${username} ${password}`);

    user_db.add_new(username, password).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": username, "reason": reject };
        res.end(JSON.stringify(body));
    })
})


module.exports = user;