const customer_db = require("../model/customer_model");
const express = require("express");
const customer_controller = express.Router();
const bodyParser = require("body-parser");
customer_controller.use(bodyParser.json());
const driver_controller = require("./driver_controller");

const broadcast_all_staff = require("../web_socket/staffs_ws")
  .broadcast_all_staff;
const broadcast_driver = require("../web_socket/staffs_ws").broadcast_driver;
const verifyAccessToken = require("./ticket_controller").verifyAccessToken;

customer_controller.put("/", verifyAccessToken, (req, res) => {
  const customer = req.body;
  console.log(customer);
  customer_db
    .add_customer(customer)
    .then(resolve => {
      console.log(resolve);

      var c = {
        topic: "customer",
        event: "new",
        customer: customer
      };
      var json = JSON.stringify(c);
      broadcast_all_staff(json);

      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        status: customer.status
      };
      res.end(JSON.stringify(body));
    })
    .catch(reject => {
      console.log(reject);
      res.writeHead(500, {
        "Content-Type": "text/json"
      });
      const body = {
        fullname: customer.fullname,
        reason: "Internal server error"
      };
      res.end(JSON.stringify(body));
    });
});

customer_controller.get("/", verifyAccessToken, (req, res) => {
  customer_db
    .get_all()
    .then(resolve => {
      console.log(resolve);
      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      //const body = { "id": cutomer.id, "fullname": customer.fullname, "status": customer.status };
      res.end(JSON.stringify(resolve));
    })
    .catch(reject => {
      console.log(reject);
      res.writeHead(500, {
        "Content-Type": "text/json"
      });
      const body = {
        fullname: customer.fullname,
        reason: "Internal server error"
      };
      res.end(JSON.stringify(body));
    });
});

customer_controller.get("/:id", verifyAccessToken, (req, res) => {
  var id = req.params.id;
  customer_db
    .get(id)
    .then(resolve => {
      console.log(resolve);
      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      //const body = { "id": cutomer.id, "fullname": customer.fullname, "status": customer.status };
      res.end(JSON.stringify(resolve));
    })
    .catch(reject => {
      console.log(reject);
      res.writeHead(500, {
        "Content-Type": "text/json"
      });
      const body = {
        fullname: customer.fullname,
        reason: "Internal server error"
      };
      res.end(JSON.stringify(body));
    });
});

customer_controller.post("/status/", verifyAccessToken, (req, res) => {
  console.log("customer_controller.post/status");
  const customer = req.body;
  console.log(customer);
  customer_db
    .update_customer_status(customer)
    .then(resolve => {
      console.log(resolve);

      var c = {
        topic: "customer",
        event: "update_status",
        customer: customer
      };
      var json = JSON.stringify(c);
      broadcast_all_staff(json);

      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        status: customer.status
      };
      res.end(JSON.stringify(body));

      customer_db.get(customer.id).then(address => {
        console.log("customer_db.get_customer_address");
        console.log(address[0]);
        var rejected = [{ username: "1234" }];
        if (customer.status == 2) {
          driver_controller.find_best_driver(address[0], rejected);
        }
      });
    })
    .catch(reject => {
      console.log(reject);
      res.writeHead(500, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        reason: "Internal server error"
      };
      res.end(JSON.stringify(body));
    });
});

customer_controller.post("/address/", verifyAccessToken, (req, res) => {
  const customer = req.body;
  console.log(customer);
  customer_db
    .update_customer_address(customer)
    .then(resolve => {
      console.log(resolve);

      var c = {
        topic: "customer",
        event: "update_address",
        customer: customer
      };
      var json = JSON.stringify(c);
      broadcast_all_staff(json);

      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        address: customer.address
      };
      res.end(JSON.stringify(body));
    })
    .catch(reject => {
      console.log(reject);
      res.writeHead(500, {
        "Content-Type": "text/json"
      });
      const body = {
        id: cutomer.id,
        fullname: customer.fullname,
        reason: "Internal server error"
      };
      res.end(JSON.stringify(body));
    });
});

customer_controller.post("/note/", verifyAccessToken, (req, res) => {
  const customer = req.body;
  console.log(customer);
  customer_db
    .update_customer_note(customer)
    .then(resolve => {
      console.log(resolve);

      var c = {
        topic: "customer",
        event: "update_note",
        customer: customer
      };
      var json = JSON.stringify(c);
      broadcast_all_staff(json);

      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        note: customer.note
      };
      res.end(JSON.stringify(body));
    })
    .catch(reject => {
      console.log(reject);
      res.writeHead(500, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        reason: "Internal server error"
      };
      res.end(JSON.stringify(body));
    });
});

customer_controller.post("/staff/", verifyAccessToken, (req, res) => {
  const customer = req.body;
  console.log(customer);
  customer_db
    .update_customer_staff(customer)
    .then(resolve => {
      console.log(resolve);

      var c = {
        topic: "customer",
        event: "update_staff",
        customer: customer
      };
      var json = JSON.stringify(c);
      broadcast_all_staff(json);

      res.writeHead(200, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        staff: customer.staff
      };
      res.end(JSON.stringify(body));
    })
    .catch(reject => {
      console.log(reject);
      res.writeHead(500, {
        "Content-Type": "text/json"
      });
      const body = {
        id: customer.id,
        fullname: customer.fullname,
        reason: "Internal server error"
      };
      res.end(JSON.stringify(body));
    });
});

module.exports = customer_controller;
