const database = require("./../db/sql_db");
var moment = require("moment");

add_customer = (customer) => {
    console.log(`add_customer function: ${customer.fullname}`);
    var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
    const query = `INSERT INTO \`customer\`(\`fullname\`, \`phone\`, \`address\`, \`note\`, \`status\`, \`time\`) VALUES (${customer.fullname},${customer.phone},${customer.address},${customer.note},${customer.status},${rdt})`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.add_customer = customer => {
    return customer_db.add(customer);
}

exports.update_customer_address = customer => {
    return customer_db.update_customer_address(customer);
}

exports.update_customer_status = customer => {
    return customer_db.update_customer_status(customer);
}