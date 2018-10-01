var fs = require('fs');
var user_db = JSON.parse(fs.readFileSync('./db/users.json', 'utf8'));

find_user = function(username) {
    console.log("find_user function: " + username);
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < user_db.length; i++) {
            if (user_db[i].username.toString() === username)
                resolve(user_db[i].password);
        }
        reject(null);
    })
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
            user_db.push(newuser);
            fs.writeFile('./db/users.json', JSON.stringify(user_db), function(err) {
                if (err) return console.log(err);
            });
            resolve("Register success");

        });
    });
}