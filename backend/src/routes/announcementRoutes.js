import express from 'express';
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAnnouncements).post(protect, createAnnouncement);
router
  .route('/:id')
  .put(protect, updateAnnouncement)
  .delete(protect, deleteAnnouncement);

export default router;
