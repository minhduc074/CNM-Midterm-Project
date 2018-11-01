const customer_db = require("../model/customer_model");
const express = require('express');
const customer_controller = express.Router();
const bodyParser = require('body-parser');
customer_controller.use(bodyParser.json());


customer_controller.put("/", (req, res) => {
    const customer = req.body;
    console.log(customer);
    customer_db.add_customer(customer).then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "id": customer.id, "fullname": customer.fullname, "status": customer.status };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "fullname": customer.fullname, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    });
})

customer_controller.get("/", (req, res) => {
    customer_db.get_all().then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        //const body = { "id": cutomer.id, "fullname": customer.fullname, "status": customer.status };
        res.end(JSON.stringify(resolve));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "fullname": customer.fullname, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    });
})

customer_controller.get("/:id", (req, res) => {
    var id = req.params.id;
    customer_db.get(id).then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        //const body = { "id": cutomer.id, "fullname": customer.fullname, "status": customer.status };
        res.end(JSON.stringify(resolve));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "fullname": customer.fullname, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    });
})

customer_controller.post("/status/", (req, res) => {
    const customer = req.body;
    console.log(customer);
    customer.update_customer_status(customer).then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "id": customer.id, "fullname": customer.fullname, "status": customer.status };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "id": customer.id, "fullname": customer.fullname, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    })
})

customer_controller.post("/address/", (req, res) => {
    const customer = req.body;
    console.log(customer);
    customer.update_customer_address(customer).then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "id": customer.id, "fullname": customer.fullname, "address": customer.address };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "id": cutomer.id, "fullname": customer.fullname, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    })
})

customer_controller.post("/customer/note/", (req, res) => {
    const customer = req.body;
    console.log(customer);
    customer.update_customer_note(customer).then(resolve => {
        console.log(resolve);
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "id": customer.id, "fullname": customer.fullname, "note": customer.note };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, { 'Content-Type': 'text/json' });
        const body = { "id": customer.id, "fullname": customer.fullname, "reason": "Internal server error" };
        res.end(JSON.stringify(body));
    })
})

module.exports = customer_controller;