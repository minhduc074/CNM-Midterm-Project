const express = require('express');
const driver = express.Router();

var http = require('https');
var querystring = require('querystring');

const bodyParser = require('body-parser');
driver.use(bodyParser.json());

const verifyAccessToken = require('./ticket_controller').verifyAccessToken;

const driver_db = require("../model/driver_model");
const ticket = require("./ticket_controller");



driver.find_driver = (lat_lng, rejected) => {
    console.log('find_driver: ' + lat_lng);

    /*

       https://maps.googleapis.com/maps/api/distancematrix/json?
       units=imperial&origins=40.6655101,-73.89188969999998&
       destinations=
       40.6905615%2C-73.9976592
       %7C40.6905615%2C-73.9976592
       %7C40.6905615%2C-73.9976592
       %7C40.6905615%2C-73.9976592
       %7C40.6905615%2C-73.9976592
       %7C40.6905615%2C-73.9976592
       %7C40.659569%2C-73.933783
       %7C40.729029%2C-73.851524
       %7C40.6860072%2C-73.6334271
       %7C40.598566%2C-73.7527626
       %7C40.659569%2C-73.933783
       %7C40.729029%2C-73.851524
       %7C40.6860072%2C-73.6334271
       %7C40.598566%2C-73.7527626
       &key=AIzaSyAMn4lpHhrMrLICzyZrIWAKYeMKXEUkp6U

    */

    return new Promise((resolve, reject) => {
        driver_db.get_all().then(driver_list => {
            console.log("driver_list: " + driver_list);
            var path = "/maps/api/distancematrix/json?units=imperial&origins=" + lat_lng.lat + "," + lat_lng.lng + "&destinations=";

            driver_list.forEach(d => {
                console.log(d);
                if (d.status != 0 && d.geocoding != "") {
                    var geocoding = JSON.parse(d.geocoding);
                    path += "" + geocoding.lat + ',' + geocoding.lng + '|';
                }
            });
            path += "&key=AIzaSyAMn4lpHhrMrLICzyZrIWAKYeMKXEUkp6U";
            var post_options = {
                host: 'maps.googleapis.com',
                path: path,
                method: 'GET'
            };
            console.log("path" + path);

            // Set up the request
            var post_req = http.request(post_options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('Response: ' + chunk);
                    resolve(chunk);
                });
            });

            // post the data
            post_req.end();
        })
    })

}

driver.get("/customer/", (req, res) => {
    var lat_lng = {
        lat: 10.851766363393738,
        lng: 106.74736888200073
    }
    var min_duration = -1;
    driver.find_driver(lat_lng, 0).then(result => {
        var result_str = JSON.parse(result);
        var ret;

        driver_db.get_all().then(driver_list => {
            for(var i = 0; i < driver_list.length; i++)
            {
                if (driver_list[i].status == 0 || driver_list[i].geocoding == "") {
                    driver_list.splice(i,1);
                }
            }
            console.log(driver_list);
            console.log(result_str.rows[0].elements.length);
            for(var i = 0; i < result_str.rows[0].elements.length; i++)
            {
                console.log("i=" +i);
                console.log(driver_list[i]);
                if (min_duration == -1)
                    {
                        ret = driver_list[i];
                        min_duration = result_str.rows[0].elements[i].duration.value;
                    }
                if (min_duration > result_str.rows[0].elements[i].duration.value)
                    {
                        min_duration = result_str.rows[0].elements[i].duration.value;
                        ret = driver_list[i];
                    }
            }

            console.log(ret);
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            res.end(JSON.stringify(ret));
        })
    })

})

driver.post("/address/", (req, res) => {
    const request = req.body;

    console.log("driver.address " + request.username + " " + request.address);
    var geocoding = "{\"lat\":" + request.lat + ",\"lng\":" + request.lat + "}"
    driver_db.update_address(request.username, request.address, geocoding).then(resolve => {

        res.writeHead(200, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": request.username,
            "reason": resolve
        };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": request.username,
            "reason": reject
        };
        res.end(JSON.stringify(body));
    })

})

driver.get("/address/:username", (req, res) => {
    var username = req.params.username;

    console.log("user.address" + username);
    driver_db.get_address(username).then(resolve => {

        res.writeHead(200, {
            'Content-Type': 'text/json'
        });
        //console.log(resolve);
        const body = {
            "username": username,
            "address": resolve[0].address
        };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": username,
            "reason": reject
        };
        res.end(JSON.stringify(body));
    })

})

driver.post("/login/", (req, res) => {
    const body = req.body;
    console.log("Post login Entry: " + body);
    const username = body.username;
    const password = body.password;

    const accessToken = ticket.generateAccessToken(driver);
    const refreshToken = ticket.generateRefreshToken();
    driver_db.authenticate(username, password).then(driver => {
        console.log("driver_db.authenticate: " + driver);
        ticket.generateRefreshToken();
        ticket.updateRefreshToken("driver_" + username, refreshToken).then(() => {

            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            const body = {
                "username": username,
                "address": driver.address,
                "fullname": driver.fullname,
                "phone": driver.phone,
                "access_token": accessToken,
                "refresh_token": refreshToken
            };
            res.end(JSON.stringify(body));
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('Server Error');
        });
    }).catch(() => {
        console.log("401 incorrect username/password ");
        res.writeHead(401, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": username,
            "reason": "incorrect username/password"
        };
        res.end(JSON.stringify(body));
    });

})

driver.post("/register/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`driver.post ${users.username} ${users.password}`);

    driver_db.add_new(users).then(resolve => {
        console.log(resolve);
        res.writeHead(200, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": users.username,
            "reason": resolve
        };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(400, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": users.username,
            "reason": reject
        };
        res.end(JSON.stringify(body));
    })
});

driver.post("/update/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`driver.post ${users.username} ${users.password}`);

    driver_db.update(users).then(resolve => {
        //console.log(resolve);
        res.writeHead(200, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": users.username,
            "reason": "Update successfully"
        };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": users.username,
            "reason": "Internal server error"
        };
        res.end(JSON.stringify(body));
    })
});

driver.post("/logout/", (req, res) => {
    const users = req.body;
    console.log(users);
    console.log(`user.post ${users.username} ${users.password}`);

    ticket.updateRefreshToken("driver_" + users.username, ticket.generateRefreshToken()).then(resolve => {
        console.log(resolve);
        res.writeHead(200, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": users.username,
            "reason": "Logout successfully"
        };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        console.log(reject);
        res.writeHead(500, {
            'Content-Type': 'text/json'
        });
        const body = {
            "username": users.username,
            "reason": "Internal server error"
        };
        res.end(JSON.stringify(body));
    })
});

module.exports = driver;