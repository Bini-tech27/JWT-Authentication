const express = require('express');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`"Server is running at port ${PORT}"`)
})