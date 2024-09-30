const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/blogs', authMiddleware, blogController.getBlogs);
router.post('/blogs', authMiddleware, blogController.createBlog);

module.exports = router;
