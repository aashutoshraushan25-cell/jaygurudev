import express from 'express';
import {
  getStates,
  getStateById,
  createState,
  updateState,
  deleteState,
} from '../controllers/stateController.js';
import { getDistrictsByState } from '../controllers/districtController.js';
import { getSatsangsByState } from '../controllers/satsangController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getStates).post(protect, createState);
router
  .route('/:id')
  .get(getStateById)
  .put(protect, updateState)
  .delete(protect, deleteState);

// Sub-routes for state
router.get('/:stateId/districts', getDistrictsByState);
router.get('/:stateId/satsangs', getSatsangsByState);

export default router;
