var express = require('express');
var products = express.Router();

var bodyParser = require('body-parser');
products.use(bodyParser.json());

var products_db = require('../model/products_model');

products.get("/products/:key", function(req, res) {
    products_db.find(req.params.key).then(function(resolve) {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(resolve));
    }).catch(function(reject) {
        console.log("201");
        res.writeHead(201, { 'Content-Type': 'text/json' });
        res.end(reject);
    })
});

products.get("/products", function(req, res) {
    products_db.load_all().then(function(resolve) {
        console.log("products_db.get returned 200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        console.log(resolve);

        res.end(JSON.stringify(resolve));
    }).catch(function(reject) {
        console.log("products_db.get returned 400");
        res.writeHead(400, { 'Content-Type': 'text/json' });
        var body = { "Name": Name, "reason": reject }
        console.log(reject);
        res.end(JSON.stringify(body));
    });
});

products.post("/products", function(req, res) {
    console.log("post.products entered");
    var body = req.body;
    console.log(body);

    var name = body.name;
    var price = body.price;
    var description = body.description;
    var image_url = body.image_url;

    products_db.add(name, price, description, image_url).then(function(resolve) {
        console.log("products_db.add returned 200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        var body = { "Name": name, "reason": "success" }
        console.log(resolve);
        res.end(JSON.stringify(body));
    }).catch(function(reject) {
        console.log("products_db.add returned 400");
        res.writeHead(400, { 'Content-Type': 'text/json' });
        var retbody = { "Name": Name, "reason": reject }
        console.log(reject);
        res.end(JSON.stringify(retbody));
    });
});

module.exports = products;