const customer_db = require("../model/customer_model");

exports.add_customer = customer => {
    return customer_db.add(customer);
}

exports.update_customer_address = customer => {
    return customer_db.update_customer_address(customer);
}

exports.update_customer_status = customer => {
    return customer_db.update_customer_status(customer);
}