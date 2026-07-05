import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Return the path in a format the frontend can use
  res.json({
    message: 'Image uploaded successfully',
    image: `/${req.file.path.replace(/\\/g, '/')}`,
  });
});

export default router;
