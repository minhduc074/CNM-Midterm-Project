debug = log => {
    console.log(`${__filename}::${__function}:${__line} ${log}`);
}

const database = require("./../db/sql_db");

exports.find = key => find_products(key)

find_products = key => {
    console.log(`Find product: key: ${key}`);

    const query = `SELECT * FROM users WHERE name='${key}' or id='${key}'`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

add_products = product => {
    console.log(`add_products: ${product}`);
    const query = `INSERT INTO \`products\`(\`name\`, \`price\`, \`description\`, \`image_url\`) VALUES ('${product.name}',${product.price},'${product.description}','${product.image_url}')`;
    console.log(`query = ${query}`);
    return database.query_db(query);
}

get_all_products = product => {
    console.log(`get_all_products: ${product}`);
    const query = "SELECT * FROM `products` WHERE 1";
    console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.load_all = () => get_all_products();

exports.add = (Name, Price, Description, Image_url) => {

    const new_product = {
        "name": Name,
        "price": Price,
        "description": Description,
        "image_url": Image_url
    };
    return new Promise((resolve, reject) => {
        add_products(new_product).then(res => {
            console.log(`exports.add resolved${res}`);
            resolve(res);
        }).catch(rej => {
            console.log(`exports.add rejected${rej}`);
            reject(rej);
        });
    });
}