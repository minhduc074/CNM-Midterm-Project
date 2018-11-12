const database = require("./../db/sql_db");
var moment = require("moment");


exports.add_customer = customer => {
    console.log(`add_customer function: ${customer.fullname}`);
    var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
    const query = `INSERT INTO \`customer\`(\`fullname\`, \`phone\`, \`address\`, \`note\`, \`status\`,\`staff\`, \`driver\`, \`create_time\`) VALUES (\"${customer.fullname}\",\"${customer.phone}\",\"${customer.address}\",\"${customer.note}\",\"${customer.status}\", \"${customer.staff}\", \"${customer.driver}\",\"${rdt}\")`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.get_all = () => {
    console.log(`get_all function:`);
    const query = `SELECT * FROM \`customer\` WHERE 1`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.get = (id) => {
    console.log(`get_all function:`);
    const query = `SELECT * FROM \`customer\` WHERE \`id\`=${id} `;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.update_customer_address = customer => {
    console.log(`update_customer_address function: ${customer}`);
    const query = `UPDATE \`customer\` SET \`address\`=\"${customer.address}\" WHERE \`id\` = ${customer.id}`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.update_customer_status = customer => {
    console.log(`update_customer_status function: ${customer}`);
    const query = `UPDATE \`customer\` SET \`status\`=\"${customer.status}\" WHERE \`id\` = ${customer.id}`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.update_customer_note = customer => {
    console.log(`update_customer_note function: ${customer}`);
    const query = `UPDATE \`customer\` SET \`note\`=\"${customer.note}\" WHERE \`id\` = ${customer.id}`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.update_customer_staff = customer => {
    console.log(`update_customer_staff function: ${customer}`);
    const query = `UPDATE \`customer\` SET \`staff\`=\"${customer.staff}\" WHERE \`id\` = ${customer.id}`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}