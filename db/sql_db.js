var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'shopping_cart'
    });
}

exports.query_db = sql => {
    return new Promise(function(resolve, reject) {
        var cn = createConnection();
        cn.connect();
        console.log("Connect to database successfully");
        cn.query(sql, function(err, rows, fields) {
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