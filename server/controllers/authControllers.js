const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/dataSource'); // Use require to import the data source
const { User } = require('../models/User');
const { getManager } = require('typeorm');

// Register Function
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userRepository = getManager().getRepository(User);

        // Check if the user already exists
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = userRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user in the database
        await userRepository.save(newUser);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Login Function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRepository = getManager().getRepository(User);

        // Check if the user exists
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token to the client
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
