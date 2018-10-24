const database = require("./../db/sql_db");


find_driver = username => {
    console.log(`find_driver function: ${username}`);
    const query = `SELECT * FROM \`driver\` WHERE username='${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

add_driver = (users) => {
    console.log(`add_driver function: ${users.username}`);
    const query = `INSERT INTO \`driver\` (\`username\`, \`status\`, \`address\`, \`password\`) VALUES ('${users.username}', '0','${users.address}', '${users.password}')`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

update_driver_address = (username, address) => {
    console.log(`driver update_driver_address function: ${username}`);
    const query = `UPDATE \`driver\` SET \`address\`='${address}' WHERE \`driver_id\` = '${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

get_driver_address = (username) => {
    console.log(`driver update_driver_address function: ${username}`);
    const query = `SELECT \`address\` FROM \`driver\` WHERE \`driver_id\`='${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.authenticate = (username, password) => new Promise((resolve, reject) => {
    console.log("driver_model:authenticate: Entry " + username + " " + password);
    find_driver(username).then(user => {
        console.log("driver_model:authenticate: " + user[0].username + " " + user[0].password);
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


exports.add_new = (users) => new Promise((resolve, reject) => {
    console.log("driver.add_new");
    find_driver(users.username).then(find_driver_resolve => {
        console.log(find_driver_resolve);
        if (find_driver_resolve.length > 0) {
            reject("User already exits");
        } else {
            add_driver(users).then(add_driver_resolve => {
                console.log(add_driver_resolve);
                resolve("Register successfully");
            }).catch(add_driver_resolve => {
                reject(add_driver_resolve)
            })
        }
    }).catch(find_driver_reject => {
        console.log(find_driver_reject);
        add_driver(username, password).then(add_driver_resolve => {
            console.log(add_driver_resolve);
            resolve("Register successfully");
        }).catch(add_driver_reject => {
            reject(add_driver_reject)
        })
    });
});

exports.update_address = (username, address) => new Promise((resolve, reject) => {
    console.log("driver:update_driver_address: Entry " + username + " " + address);
    find_driver(username).then(user => {
        console.log("driver:update_driver_address: " + user[0].username);
        if (Object.keys(user).length == 0) {
            reject("driver Cannot find this user");
        } else {
            update_driver_address(username, address).then(update_driver_address_resolve => {
                console.log("driver update_driver_address_resolve " + update_driver_address_resolve);
                resolve("driver update_driver_address successfully");
            }).catch(update_driver_address_reject => {
                console.log("update_driver_address_reject " + update_driver_address_reject);
                reject(update_driver_address_reject)
            })
        }
    }).catch(rej => {
        console.log(rej);
        reject();
    })
})

exports.get_address = (username) => new Promise((resolve, reject) => {
    console.log("driver:update_driver_address: Entry " + username);
    find_driver(username).then(user => {
        console.log("driver:update_driver_address: " + user[0].username);
        if (Object.keys(user).length == 0) {
            reject("Cannot find this user");
        } else {
            get_driver_address(username).then(get_driver_address_resolve => {
                console.log(get_driver_address_resolve);
                resolve(get_driver_address_resolve);
            }).catch(get_driver_address_reject => {
                reject(get_driver_address_reject)
            })
        }
    }).catch(rej => {
        console.log(rej);
        reject();
    })
})