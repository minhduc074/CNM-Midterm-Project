const mysql = require('mysql');
const express = require('express');
const app = express();

const createConnection = () => {
    if (app.settings.env === "development") {
        return mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'midterm_project'
        });
    } else {
        return mysql.createConnection({
            //connectionString: mysql://bf6dbeab1bb641:0997f35c@us-cdbr-iron-east-01.cleardb.net/heroku_226cb065f176ed4?reconnect=true
            host: 'us-cdbr-iron-east-01.cleardb.net',
            port: 3306,
            user: 'bf6dbeab1bb641',
            password: '0997f35c',
            database: 'heroku_226cb065f176ed4'
        });
    }
};

exports.query_db = sql => {
    console.log("Query sql: " + sql);
    return new Promise((resolve, reject) => {
        const cn = createConnection();
        cn.connect();
        console.log("Connect to database successfully");
        cn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(`err: ${err}`);
                reject(err);
            } else {
                console.log(`row: ${rows}`);
                console.log(rows);
                resolve(rows);
            }

            cn.end({ timeout: 60000 });
        });
        //cn.end();
    });
}