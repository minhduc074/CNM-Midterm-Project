var database = require("./../db/sql_db");

exports.updateRefreshToken = (userId, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = `delete from userRefreshTokenExt where ID = ${userId}`;
        database.query_db(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into userRefreshTokenExt values(${userId}, '${rfToken}', '${rdt}')`;
                return database.query_db(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}