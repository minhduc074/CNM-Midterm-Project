var express = require('express');
var products = express.Router();
var fs = require('fs');
var products_db = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'));


products.get("/products/:id", function(req, res) {

});
products.get("/products", function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(products_db));
});


module.exports = products;