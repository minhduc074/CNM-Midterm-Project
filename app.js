const express = require('express');
const app = express();
const driver = require("./controller/driver_controller");
const staffs = require("./controller/staffs_controller");
const customer = require("./controller/customer_controller");
var socket = require("./web_socket/staffs_ws");
    //const ticket = require("./controller/ticket_controller");
const morgan = require('morgan');
var cors = require('cors')



app.use(morgan('dev'));
app.use(cors());

morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
].join(' '))

app.use("/driver", driver);
app.use('/staffs', staffs);
app.use("/customer", customer)

const https = require("http").createServer(app);
https.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});