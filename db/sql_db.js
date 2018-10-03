var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'sql3.freemysqlhosting.net',
        port: 3306,
        user: 'sql3259605',
        password: '5lA57qMDKA',
        database: 'sql3259605'
    });
}

exports.query_db = sql => {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        console.log("Connect to database successfully");
        cn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log("err: " + err);
                reject(err);
            } else {
                console.log("row: " + rows);
                resolve(rows);
            }

            cn.end();
        });
    });
}