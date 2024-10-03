const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const AppDataSource = require('../server/config/dataSource'); // Ensure correct path
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', blogRoutes);

const PORT = process.env.PORT || 5050;

// Initialize the database connection and then start the server
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error during Data Source initialization', error);
    });
