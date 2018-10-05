const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://jrmpwczvyyimhw:22a95c26ff9d9591c7d96a544ea6cddc7d631d7c317f8ac9fa0cd8ef419767a4@ec2-54-225-68-133.compute-1.amazonaws.com:5432/d1kgh9947t1f0o"
});

client.connect();

client.query(sql, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});


module.exports = client;