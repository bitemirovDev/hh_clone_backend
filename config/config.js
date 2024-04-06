const fs = require('fs')
const path = require('path')

module.exports = {
    development: {
        username: 'admin',
        password: 'root',
        database: 'admin',
        host: 'localhost',
        dialect: 'postgres', 
    },
    production: {
        username: 'doadmin',
        password: 'AVNS_-hVgf6yzQEBD84dN6Lu',
        database: 'defaultdb',
        host: 'db-postgresql-fra1-60574-do-user-14613666-0.b.db.ondigitalocean.com',
        dialect: 'postgres',
        port: 25060,
        dialectOptions: {
            ssl:{
                ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt"))
            }
        }
    },
    secretKey: 'секретный_ключ'
};