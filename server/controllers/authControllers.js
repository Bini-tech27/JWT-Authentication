const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// User Registration
exports.register = (req, res) => {
    const { username, email, password } = req.body;
    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send(err);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hash], (error, results) => {
            if (error) return res.status(500).send(error);
            res.status(201).send('User registered successfully');
        });
    });
};

// User Login
exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(400).send('User not found');
        
        const user = results[0];
        // Compare password
        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) return res.status(500).send(error);
            if (!isMatch) return res.status(400).send('Invalid credentials');

            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
