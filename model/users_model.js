const database = require("./../db/sql_db");

find_user = username => {
    console.log(`find_user function: ${username}`);
    const query = `SELECT * FROM \`users\` WHERE username='${username}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

add_user = (username, password) => {
    console.log(`add_user function: ${username}`);
    const query = `INSERT INTO \`users\` (\`username\`, \`password\`) VALUES ('${username}', '${password}')`;
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

exports.add_new = (username, password) => new Promise((resolve, reject) => {
    find_user(username).then(find_user_resolve => {
        console.log(find_user_resolve);
        if (find_user_resolve.length > 0) {
            reject("User already exits");
        } else {
            add_user(username, password).then(add_user_resolve => {
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
        }).catch(add_user_resolve => {
            reject(add_user_resolve)
        })
    });
});