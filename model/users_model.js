var fs = require('fs');
var user_db = JSON.parse(fs.readFileSync('./db/users.json', 'utf8'));

var database = require("./../db/sql_db");

find_user = function(username) {
    console.log("find_user function: " + username);
    var query = "SELECT * FROM `users` WHERE username='" + username + "'";
    console.log("query = " + query);
    return database.query_db(query);
}

add_user = function(username, password) {
    console.log("add_user function: " + username);
    var query = "INSERT INTO `users` (`username`, `password`) VALUES ('" + username + "', ' " + password + "')";
    console.log("query = " + query);
    return database.query_db(query);
}

exports.authenticate = function(username, password) {
    return new Promise(function(resolve, reject) {
        find_user(username).then(function(db_password) {
            console.log(db_password);
            if (db_password === null)
                reject();
            if (db_password.toString() === password.toString())
                resolve();
            else reject();
        }).catch(function(reject) {
            console.log(reject);
            reject();
        })
    })
}

exports.add_new = function(username, password) {
    return new Promise(function(resolve, reject) {
        find_user(username).then(function(res) {
            reject("User already exits");
        }).catch(function(rej) {
            var newuser = {
                "username": username,
                "password": password
            };
            add_user(username, password).then(function(res) {
                resolve("Register successfully");
            }).catch(function(rej) {
                reject(rej)
            })


        });
    });
}