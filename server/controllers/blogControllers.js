const db = require('../config/db');

// Get All Blogs
exports.getBlogs = (req, res) => {
    const query = 'SELECT * FROM blogs WHERE user_id = ?';
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// Create a Blog
exports.createBlog = (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)';
    db.query(query, [title, content, req.user.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Blog created');
    });
};
