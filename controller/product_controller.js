var express = require('express');
var products = express.Router();
var fs = require('fs');
var products_db = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'));

function find_product_by_id(id) {
    for (var i = 0; i < products_db.length; i++) {
        if (products_db[i].ID.toString() === id)
            return products_db[i];
    }
    return null;
}

function find_product_by_name(name) {
    for (var i = 0; i < products_db.length; i++) {
        if (products_db[i].Name.toString() === name)
            return products_db[i];
    }
    return null;
}

products.get("/products/:id", function(req, res) {
    var ret = find_product_by_id(req.params.id);
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
    res.end(JSON.stringify(products_db));
});


module.exports = products;