import express from 'express';
import {
  getVideos,
  syncVideos,
  addVideo,
  deleteVideo,
  updateConfig,
} from '../controllers/youtubeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/videos', getVideos);
router.post('/sync', protect, syncVideos);
router.post('/add', protect, addVideo);
router.delete('/:id', protect, deleteVideo);
router.put('/config', protect, updateConfig);

export default router;
