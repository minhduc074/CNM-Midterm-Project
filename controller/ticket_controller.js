var express = require('express');

var user = express.Router();
var fs = require('fs');
var user_db = JSON.parse(fs.readFileSync('./db/users.json', 'utf8'));



module.exports = user;