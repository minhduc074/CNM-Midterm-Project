const mysql = require('mysql');

const createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'shopping_cart'
    });
};

const createCnn = () => {
    return mysql.createConnection({
        //connectionString: 'mysql://b3fbb254808323:bb69f4d4@us-cdbr-iron-east-01.cleardb.net/heroku_579ee79817c6d61?reconnect=true'
        host: 'us-cdbr-iron-east-01.cleardb.net',
        port: 3306,
        user: 'b3fbb254808323',
        password: 'bb69f4d4',
        database: 'heroku_579ee79817c6d61'
    });
}

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
                resolve(rows);
            }

            //cn.end();
        });
        cn.end();
    });
}