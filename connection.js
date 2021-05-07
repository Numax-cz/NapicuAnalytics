require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERKOKOT,
    database: process.env.DB,
    password: process.env.PASSWORD
});

module.exports = connection;