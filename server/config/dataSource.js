require('dotenv').config(); // Ensure this is at the top of your entry file
const { DataSource } = require('typeorm');
const { User } = require('../models/User');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true, // Optional, only for dev use
});



module.exports = AppDataSource;
