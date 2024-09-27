const express = require('express');
const mysql = require("mysql2");
const PORT = 5050;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`"Server is running at port ${PORT}"`)
})