const {Sequelize} = require('sequelize')
const dbConf = require('./config')
const fs = require('fs')
const path = require('path');

let sequelize; 

if(process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize(dbConf.production.database, dbConf.production.username, dbConf.production.password, {
        host: dbConf.production.host,
        dialect: dbConf.production.dialect,
        port: dbConf.production.port,
        dialectOptions: {
            ssl:{
                ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt"))
            }
        }
    })
}else{
    sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
        host: dbConf.development.host,
        dialect: dbConf.development.dialect,
    })
}


// Проверка соединения с базой

sequelize
    .authenticate()
    .then(() =>{
        console.log('Connection to the database has been established successfully');
    })
    .catch((error) =>{
        console.error('Unable to connect to the database', error);
    })

module.exports = sequelize