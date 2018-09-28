var fs = require('fs');
var products_db = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'));

exports.find_product_by_id = function(id) {
    for (var i = 0; i < products_db.length; i++) {
        if (products_db[i].ID.toString() === id)
            return products_db[i];
    }
    return null;
}

exports.find_product_by_name = function(name) {
    for (var i = 0; i < products_db.length; i++) {
        if (products_db[i].Name.toString() === name)
            return products_db[i];
    }
    return null;
}