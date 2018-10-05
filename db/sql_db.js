/*var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'ec2-54-243-212-122.compute-1.amazonaws.com',
        port: 5432,
        user: 'vzsgkahaamsjwu',
        password: 'g6JH09_xEBVTYiLg0YQztAcE3F',
        database: 'daem725mdgoq0g'
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
*/