var express = require('express');
var products = express.Router();

var bodyParser = require('body-parser');
products.use(bodyParser.json());

var products_db = require('../model/products_model');

products.get("/products/id/:id", function(req, res) {
    var ret = products_db.find_product_by_id(req.params.id);
    if (ret === null) {
        console.log("201");
        res.writeHead(201, { 'Content-Type': 'text/json' });
        res.end(null);
    } else {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(ret));
    }
});

products.get("/products/name/:id", function(req, res) {
    var ret = products_db.find_product_by_name(req.params.id);
    if (ret === null) {
        console.log("201");
        res.writeHead(201, { 'Content-Type': 'text/json' });
        res.end(null);
    } else {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(ret));
    }
});

products.get("/products", function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/json' });

});


module.exports = products;