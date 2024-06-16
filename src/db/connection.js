require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({

    // client: 'pg',

    // connection: {

        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    // }
});

module.exports = pool;