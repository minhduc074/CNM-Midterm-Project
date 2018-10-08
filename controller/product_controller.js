const express = require('express');
const products = express.Router();

const bodyParser = require('body-parser');
products.use(bodyParser.json());

const products_db = require('../model/products_model');

products.get("/products/:key", (req, res) => {
    products_db.find(req.params.key).then(resolve => {
        console.log("200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(resolve));
    }).catch(reject => {
        console.log("201");
        res.writeHead(201, { 'Content-Type': 'text/json' });
        res.end(reject);
    })
});

products.get("/products", (req, res) => {
    products_db.load_all().then(resolve => {
        console.log("products_db.get returned 200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        console.log(resolve);

        res.end(JSON.stringify(resolve));
    }).catch(reject => {
        console.log("products_db.get returned 400");
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "Name": Name, "reason": reject };
        console.log(reject);
        res.end(JSON.stringify(body));
    });
});

products.post("/products", (req, res) => {
    console.log("post.products entered");
    const body = req.body;
    console.log(body);

    const name = body.name;
    const price = body.price;
    const description = body.description;
    const image_url = body.image_url;

    products_db.add(name, price, description, image_url).then(resolve => {
        console.log("products_db.add returned 200");
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "Name": name, "reason": "success" };
        console.log(resolve);
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log("products_db.add returned 400");
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const retbody = { "Name": Name, "reason": reject };
        console.log(reject);
        res.end(JSON.stringify(retbody));
    });
});

module.exports = products;