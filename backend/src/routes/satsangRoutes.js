import express from 'express';
import {
  getSatsangs,
  getSatsangById,
  getSatsangsByState,
  getSatsangsByDistrict,
  getSatsangHighlights,
  createSatsang,
  updateSatsang,
  deleteSatsang,
} from '../controllers/satsangController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getSatsangs).post(protect, createSatsang);
router.get('/highlights', getSatsangHighlights);
router.get('/state/:stateId', getSatsangsByState);
router.get('/district/:districtId', getSatsangsByDistrict);

router
  .route('/:id')
  .get(getSatsangById)
  .put(protect, updateSatsang)
  .delete(protect, deleteSatsang);

export default router;
