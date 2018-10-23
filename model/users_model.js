const database = require("./../db/sql_db");

find_user = username => {
    console.log(`find_user function: ${username}`);
    const query = `SELECT * FROM \`users\` WHERE username='${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

add_user = (users) => {
    console.log(`add_user function: ${users.username}`);
    const query = `INSERT INTO \`users\` (\`username\`, \`password\`, \`fullname\`, \`phone\`, \`email\`, \`address\`) VALUES ('${users.username}', '${users.password}', '${users.fullname}', '${users.phone}', '${users.email}', '${users.address}')`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

update_address = (username, address) => {
    console.log(`update_address function: ${username}`);
    const query = `UPDATE \`users\` SET \`address\`='${address}' WHERE \`username\` = '${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

get_address = (username) => {
    console.log(`update_address function: ${username}`);
    const query = `SELECT \`address\` FROM \`users\` WHERE \`username\`='${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}


exports.authenticate = (username, password) => new Promise((resolve, reject) => {
    console.log("users_model:authenticate: Entry " + username + " " + password);
    find_user(username).then(user => {
        console.log("users_model:authenticate: " + user[0].username + " " + user[0].password);
        if (Object.keys(user).length == 0) {
            reject("Cannot find this user");
        } else if (user[0].password.trim() == password.trim()) {
            resolve(user[0]);
        } else {
            reject();
        }
    }).catch(rej => {
        console.log(rej);
        reject();
    })
})

exports.update_address = (username, address) => new Promise((resolve, reject) => {
    console.log("users_model:update_address: Entry " + username + " " + address);
    find_user(username).then(user => {
        console.log("users_model:update_address: " + user[0].username);
        if (Object.keys(user).length == 0) {
            reject("Cannot find this user");
        } else {
            update_address(username, address).then(update_address_resolve => {
                console.log(update_address_resolve);
                resolve("update_address successfully");
            }).catch(update_address_reject => {
                reject(update_address_reject)
            })
        }
    }).catch(rej => {
        console.log(rej);
        reject();
    })
})

exports.get_address = (username, address) => new Promise((resolve, reject) => {
    console.log("users_model:update_address: Entry " + username);
    find_user(username).then(user => {
        console.log("users_model:update_address: " + user[0].username);
        if (Object.keys(user).length == 0) {
            reject("Cannot find this user");
        } else {
            get_address(username).then(get_address_resolve => {
                console.log(get_address_resolve);
                resolve(get_address_resolve);
            }).catch(get_address_reject => {
                reject(get_address_reject)
            })
        }
    }).catch(rej => {
        console.log(rej);
        reject();
    })
})

exports.add_new = (users) => new Promise((resolve, reject) => {
    find_user(users.username).then(find_user_resolve => {
        console.log(find_user_resolve);
        if (find_user_resolve.length > 0) {
            reject("User already exits");
        } else {
            add_user(users).then(add_user_resolve => {
                console.log(add_user_resolve);
                resolve("Register successfully");
            }).catch(add_user_resolve => {
                reject(add_user_resolve)
            })
        }
    }).catch(find_user_reject => {
        console.log(find_user_reject);
        add_user(username, password).then(add_user_resolve => {
            console.log(add_user_resolve);
            resolve("Register successfully");
        }).catch(add_user_reject => {
            reject(add_user_reject)
        })
    });
});