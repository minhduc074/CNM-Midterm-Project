const express = require('express');
const staffs = express.Router();

const bodyParser = require('body-parser');
staffs.use(bodyParser.json());


const staffs_db = require("../model/staffs_model");
const ticket = require("./ticket_controller");

staffs.post("/login/", (req, res) => {
    const body = req.body;
    console.log("Post login Entry: " + body);
    const username = body.username;
    const password = body.password;

    const accessToken = ticket.generateAccessToken(staffs);
    const refreshToken = ticket.generateRefreshToken();
    staffs_db.authenticate(username, password).then(user => {
        console.log("user_db.authenticate: " + user);
        ticket.generateRefreshToken();
        ticket.updateRefreshToken(username, refreshToken).then(() => {

            res.writeHead(200, { 'Content-Type': 'text/json' });
            const body = {
                "username": username,
                "fullname": user.fullname,
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

staffs.post("/register/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`user.post ${users.username} ${users.password}`);

    staffs_db.add_new(users).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": reject };
        res.end(JSON.stringify(body));
    })
});

staffs.post("/logout/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`user.post ${users.username} ${users.password}`);

    ticket.updateRefreshToken(ticket.generateRefreshToken()).then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": "Logout successfully" };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    })
});

staffs.post("/update/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`user.post ${users.username} ${users.password}`);

    staffs_db.update(users).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": "Update successfully" };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    })
})

module.exports = staffs;