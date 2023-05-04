const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env.' + process.env.NODE_ENV)
});

const config = {
    NODE_ENV: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB,
    mySqlHost: process.env.DB_HOST,
    mySqlUser: process.env.DB_USER,
    mySqlPass: process.env.DB_PASSWORD,
    mySqlName: process.env.DB_NAME,
    mySqlTable: process.env.DB_TABLE
};

module.exports = config;