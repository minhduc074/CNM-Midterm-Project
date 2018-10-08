var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');

var ticket_db = require("../model/tickets_model");

const SECRET = 'ABCDEF';
const AC_LIFETIME = 600; // seconds

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more info'
    }

    var token = jwt.sign(payload, SECRET, {
        expiresIn: AC_LIFETIME
    });

    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);

    if (token) {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN'
        })
    }
}

exports.generateRefreshToken = () => {
    console.log(123);
    const SIZE = 80;
    return rndToken.generate(SIZE);
}

exports.updateRefreshToken = (userId, rfToken) => {
    console.log(10);
    return ticket_db.updateRefreshToken(userId, rfToken);
}