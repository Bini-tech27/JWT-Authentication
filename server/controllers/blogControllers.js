const db = require('../config/db');

exports.getBlogs = (req, res) => {
    const blogs = 'SELECT * FROM blogs WHERE user_id = ?';
    db.query(blogs, [req.user.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.createBlog = (req, res) => {
    const { title, content } = req.body;
    const blogs = 'INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)';
    db.query(blogs, [title, content, req.user.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Blog created');
    });
};
