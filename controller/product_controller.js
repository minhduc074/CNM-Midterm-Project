var express = require('express');
var products = express.Router();

var bodyParser = require('body-parser');
products.use(bodyParser.json());

var products_db = require('../model/products_model');

products.get("/products/id/:id", function(req, res) {
    products_db.find_product_by_id(req.params.id).then(function(resolve) {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(resolve));
    }).catch(function(reject) {
        console.log("201");
        res.writeHead(201, { 'Content-Type': 'text/json' });
        res.end(null);
    })
});

products.get("/products/name/:name", function(req, res) {
    products_db.find_product_by_name(req.params.name).then(function(resolve) {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(resolve));
    }).catch(function(reject) {
        console.log("201");
        res.writeHead(201, { 'Content-Type': 'text/json' });
        res.end(null);
    })
});

products.get("/products", function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(null);
});

products.post("/products", function(req, res) {
    var body = req.body;
    console.log(body);
    var Name = body.Name;
    var Price = body.Price;
    var Location = body.Location;
    products_db.add(Name, Price, Location).then(function(resolve) {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        var body = { "Name": Name, "reason": resolve }
        res.end(JSON.stringify(body));
    }).catch(function(reject) {
        console.log("400");
        res.writeHead(400, { 'Content-Type': 'text/json' });
        var retbody = { "Name": Name, "reason": reject }
        res.end(JSON.stringify(retbody));
    });
});

module.exports = products;