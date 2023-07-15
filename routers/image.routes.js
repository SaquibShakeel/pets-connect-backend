const express = require('express');
const router = express.Router();
const { uploadMiddleware } = require('../utils/multer');

const { getImageUrl } = require('../controllers/imageController');

router.post('/', uploadMiddleware, getImageUrl);

module.exports = router;