'use strict';
const mysql = require('mysql2/promise');
const config = require('../config');
const US = require('../models/user');
var mongoose = require('mongoose')
const UserSchema = mongoose.model('users');

class Migrate {

    /**
     * Creates an instance of Migrate.
     * @memberof Migrate
     */
    constructor() {
        this.conexion = null;
    }

    /**
     * Connect MYSQL
     * This function connect to mysql database
     *
     * @memberof Migrate
     */
    async conectar() {
        if (!this.conexion) {
            this.conexion = await mysql.createConnection(
                {host: config.mySqlHost, user: config.mySqlUser, password: config.mySqlPass, database: config.mySqlName}
            );
            console.log('Conexión exitosa a la base de datos');
        }
        return this.conexion;
    }

    /**
     *  Sync Databases
     *  Get data from MYSQL and insert it into mongodb
     *
     * @return {boolean}
     * @memberof Migrate
     */
    async syncDatabases() {
        const conexion = await this.conectar();
        const totalRows = await conexion.query(
            `SELECT (COUNT)* FROM ${config.mySqlName}.${config.mySqlTable}`
        );
        const limit = 100;
        let next = 0;

        do {
            const resultado = await conexion.query(
                `SELECT * FROM ${config.mySqlName}.${config.mySqlTable} LIMIT ${limit} OFFSET ${next}`
            );
            await UserSchema.insertMany(resultado[0]);
            next += 100;
        } while (totalRows >= next);

        return true;
    }
}

module.exports = Migrate;