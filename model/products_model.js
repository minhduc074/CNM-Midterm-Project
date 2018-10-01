var fs = require('fs');
var products_db = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'));

exports.find_product_by_id = function(id) {
    console.log("Find product by ID " + id);
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < products_db.length; i++) {
            if (products_db[i].ID.toString() === id)
                resolve(products_db[i]);
        }
        reject();
    })
}

exports.find_product_by_name = function(name) {
    console.log("Find product by name " + name);
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < products_db.length; i++) {
            if (products_db[i].Name.toString() === name)
                resolve(products_db[i]);
        }
        reject();
    })
}

find_product_by_name = function(name) {
    console.log("Find product by name " + name);
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < products_db.length; i++) {
            if (products_db[i].Name.toString() === name)
                resolve(products_db[i]);
        }
        reject();
    })
}

exports.add = function(Name, Price, Location) {
    return new Promise(function(resolve, reject) {
        find_product_by_name(Name).then(function(res) {
            reject("Product already exits");
        }).catch(function(rej) {
            var new_product = {
                "ID": "" + (products_db.length + 1),
                "Name": Name,
                "Price": Price,
                "Location": Location
            };
            products_db.push(new_product);
            fs.writeFile('./db/products.json', JSON.stringify(products_db), function(err) {
                if (err) return console.log(err);
            });
            resolve("Product added successfully");
        });
    })
}