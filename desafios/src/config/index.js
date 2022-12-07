//import dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()
//import { optionMariaDB, optionSQLite } from '../services/index.js'
const mariadb  = require('./mariadb/index.js')
const sqlite3 = require('./sqllite/index.js')

const CART_FILENAME = 'carts'
const PRODUCTS_FILENAME = 'products'
const MESSAGES_FILENAME = 'messages'
const MARIA_DB = mariadb
const SQL_LITE = sqlite3

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
        SELECTED_DATABASE: process.env.SELECTED_DB ?? 'database'
    },

    DATABASE: {
        filesystem: {
            CART_FILENAME,
            PRODUCTS_FILENAME,
            MESSAGES_FILENAME
        },
        mongo: {
            url: process.env.MONGO_DB_URL,
            dbName: process.env.MONGO_DB_NAME
        },
        maria: {
            MARIA_DB
        },
        sql_lite: {
            SQL_LITE
        }
    }
}

export { config }


module.exports = {mysql, sqlite3, PRODUCTS_FILENAME };