const express = require('express');
const driver = express.Router();

const bodyParser = require('body-parser');
driver.use(bodyParser.json());

const verifyAccessToken = require('./ticket_controller').verifyAccessToken;

const driver_db = require("../model/driver_model");
const ticket = require("./ticket_controller");


driver.put("/address/", verifyAccessToken, (req, res) => {
    const request = req.body;

    console.log("driver.address " + request.username + " " + request.address);
    driver_db.update_address(request.username, request.address).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": request.username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": request.username, "reason": reject };
        res.end(JSON.stringify(body));
    })

})

driver.get("/address/:username", verifyAccessToken, (req, res) => {
    var username = req.params.username;

    console.log("user.address" + username);
    driver_db.get_address(username).then(resolve => {

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

driver.post("/login/", (req, res) => {
    const body = req.body;
    console.log("Post login Entry: " + body);
    const username = body.username;
    const password = body.password;

    const accessToken = ticket.generateAccessToken(driver);
    const refreshToken = ticket.generateRefreshToken();
    driver_db.authenticate(username, password).then(driver => {
        console.log("driver_db.authenticate: " + driver);
        ticket.generateRefreshToken();
        ticket.updateRefreshToken(username, refreshToken).then(() => {

            res.writeHead(200, { 'Content-Type': 'text/json' });
            const body = {
                "username": username,
                "address": driver.address,
                "fullname": driver.fullname,
                "phone": driver.phone,
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

driver.post("/register/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`driver.post ${users.username} ${users.password}`);

    driver_db.add_new(users).then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": reject };
        res.end(JSON.stringify(body));
    })
});

driver.post("/update/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`driver.post ${users.username} ${users.password}`);

    driver_db.update(users).then(resolve => {
        //console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": "Update successfully" };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "username": users.username, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    })
});

driver.post("/logout/", (req, res) => {
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

module.exports = driver;