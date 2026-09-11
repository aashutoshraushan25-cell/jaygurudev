import express from 'express';
import {
  getDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from '../controllers/districtController.js';
import { getSatsangsByDistrict } from '../controllers/satsangController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getDistricts).post(protect, createDistrict);
router
  .route('/:id')
  .get(getDistrictById)
  .put(protect, updateDistrict)
  .delete(protect, deleteDistrict);

router.get('/:districtId/satsangs', getSatsangsByDistrict);

export default router;
