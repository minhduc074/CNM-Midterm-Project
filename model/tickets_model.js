var database = require("./../db/sql_db");
var moment = require("moment");

exports.updateRefreshToken = (userId, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = `DELETE FROM ticket WHERE user_id = '${userId}'`;
        database.query_db(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `INSERT INTO ticket (user_id, token, release_date) VALUES ('${userId}', '${rfToken}', '${rdt}')`;
                return database.query_db(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}