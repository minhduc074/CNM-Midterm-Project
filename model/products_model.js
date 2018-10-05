var fs = require('fs');

debug = function(log) {
    console.log(__filename + "::" + __function + ":" + __line + " " + log);
}

var database = require("./../db/sql_db");

exports.find = function(key) {
    return find_products(key);
}

find_products = function(key) {
    console.log("Find product: key: " + key);

    var query = "SELECT * FROM `users` WHERE name='${key}' or id='${key}'";
    console.log("query = " + query);
    return database.query_db(query);
}

add_products = function(product) {
    console.log("add_products: " + product);
    var query = "INSERT INTO `products`(`name`, `price`, `description`, `image_url`) VALUES ('" + product.name + "'," + product.price + ",'" + product.description + "','" + product.image_url + "')"
    console.log("query = " + query);
    return database.query_db(query);
}

get_all_products = function(product) {
    console.log("get_all_products: " + product);
    var query = "SELECT * FROM `products` WHERE 1"
    console.log("query = " + query);
    return database.query_db(query);
}

exports.load_all = function() {
    return get_all_products();
};

exports.add = function(Name, Price, Description, Image_url) {

    var new_product = {
        "name": Name,
        "price": Price,
        "description": Description,
        "image_url": Image_url
    };
    return new Promise(function(resolve, reject) {
        add_products(new_product).then(function(res) {
            console.log("exports.add resolved" + res);
            resolve(res);
        }).catch(function(rej) {
            console.log("exports.add rejected" + rej);
            reject(rej);
        });
    });
}