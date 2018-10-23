const express = require('express');
const app = express();
const user = require("./controller/user_controller");
const ticket = require("./controller/ticket_controller");
const morgan = require('morgan');

const verifyAccessToken = require('./controller/ticket_controller').verifyAccessToken;

app.use(morgan('dev'));

morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
].join(' '))

const https = require("http").createServer(app);
https.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.post("/login", user);
app.post("/register", user);