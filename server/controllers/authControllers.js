const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { getRepository } = require('typeorm');
const { User } = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userRepository = getRepository(User);
        
        //check if the user already exists
        const existingUser = await userRepository.findOne({where: {email}})
        if (existingUser) {
            return res.status(400).send('User already exists');

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create a new user instance
            const newUser = await userRepository.create({
                username, email, password:hashedPassword 
            })

             // Save the new user in the database
        await userRepository.save(newUser);
        res.status(201).send('User registered successfully');
        }
    } catch (error) {
        res.status(500).send(err.message);s
        
    }


    // Hash password
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) return res.status(500).send(err);
//         const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//         db.query(query, [username, email, hash], (error, results) => {
//             if (error) return res.status(500).send(error);
//             res.status(201).send('User registered successfully');
//         });
//     });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRepository = await getRepository(User)

        //check if user exist
        const user = await userRepository.findOne({where: {email}})
        if (!user) {
            return res.status(400).send('User not found');
        }

       // Compare the hashed password
       const isMatch = await bycrpt.compare(password, user.password)
      
       if (!isMatch) {
           return res.status(400).send('Invalid credentials');
       }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

    } catch (error) {
        res.status(500).send(err.message);

    }
    // const query = 'SELECT * FROM users WHERE email = ?';
    // db.query(query, [email], (err, results) => {
    //     if (err) return res.status(500).send(err);
    //     if (results.length === 0) return res.status(400).send('User not found');
        
    //     const user = results[0];
    //     // Compare password
    //     bcrypt.compare(password, user.password, (error, isMatch) => {
    //         if (error) return res.status(500).send(error);
    //         if (!isMatch) return res.status(400).send('Invalid credentials');

    //         // Generate JWT token
    //         const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //         res.json({ token });
    //     });
    // });
};
