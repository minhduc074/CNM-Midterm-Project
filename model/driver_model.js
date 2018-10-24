const database = require("./../db/sql_db");

update_address = (username, address) => {
    console.log(`driver update_address function: ${username}`);
    const query = `UPDATE \`driver\` SET \`address\`='${address}' WHERE \`driver_id\` = '${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

get_address = (username) => {
    console.log(`driver update_address function: ${username}`);
    const query = `SELECT \`address\` FROM \`driver\` WHERE \`driver_id\`='${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}


exports.update_address = (username, address) => new Promise((resolve, reject) => {
    console.log("driver:update_address: Entry " + username + " " + address);
    find_user(username).then(user => {
        console.log("driver:update_address: " + user[0].username);
        if (Object.keys(user).length == 0) {
            reject("driver Cannot find this user");
        } else {
            update_address(username, address).then(update_address_resolve => {
                console.log("driver update_address_resolve " + update_address_resolve);
                resolve("driver update_address successfully");
            }).catch(update_address_reject => {
                console.log("update_address_reject " + update_address_reject);
                reject(update_address_reject)
            })
        }
    }).catch(rej => {
        console.log(rej);
        reject();
    })
})

exports.get_address = (username, address) => new Promise((resolve, reject) => {
    console.log("driver:update_address: Entry " + username);
    find_user(username).then(user => {
        console.log("driver:update_address: " + user[0].username);
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