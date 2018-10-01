var fs = require('fs');
var products_db = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'));

exports.find_product_by_id = function(id) {
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < products_db.length; i++) {
            if (products_db[i].ID.toString() === id)
                resolve(products_db[i]);
        }
        reject();
    })
}

exports.find_product_by_name = function(name) {
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < products_db.length; i++) {
            if (products_db[i].Name.toString() === name)
                resolve(products_db[i]);
        }
        reject();
    })
}