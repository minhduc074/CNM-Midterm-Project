const express = require('express');
const driver = express.Router();

const bodyParser = require('body-parser');
driver.use(bodyParser.json());

const verifyAccessToken = require('./ticket_controller').verifyAccessToken;

const driver_model = require("../model/driver_model");
const ticket = require("./ticket_controller");


driver.put("/address/", verifyAccessToken, (req, res) => {
    const request = req.body;

    console.log("driver.address " + request.username + " " + request.address);
    driver_model.update_address(request.username, request.address).then(resolve => {

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
    driver_model.get_address(username).then(resolve => {

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

module.exports = driver;