const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

module.exports = connection;



// module.exports = {
//     type: "mysql",
//     host: process.env.DB_HOST,
//     port: 3306,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: true, // Automatically create tables based on entities (use in development only)
//     logging: true,
//     entities: [
//         "src/entity/**/*.js"
//     ],
//     migrations: [
//         "src/migration/**/*.js"
//     ],
//     subscribers: [
//         "src/subscriber/**/*.js"
//     ],
//     cli: {
//         entitiesDir: "src/entity",
//         migrationsDir: "src/migration",
//         subscribersDir: "src/subscriber"
//     }
// };

