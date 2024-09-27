const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/blogs', authMiddleware, blogController.getBlogs);
router.post('/blogs', authMiddleware, blogController.createBlog);

module.exports = router;
