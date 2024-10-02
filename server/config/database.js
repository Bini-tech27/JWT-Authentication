import { DataSource } from "typeorm"
import { User } from "../models/User"

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

module.exports = AppDataSource;