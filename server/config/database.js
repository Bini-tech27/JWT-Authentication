import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host:  process.env.DB_HOST,
    port: 3306,
    username:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_NAME,
    entities: [User]

})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


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