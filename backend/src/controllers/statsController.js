import Satsang from '../models/Satsang.js';
import State from '../models/State.js';
import District from '../models/District.js';

// @desc    Get system-wide stats for Admin Dashboard and Homepage counters
// @route   GET /api/stats
// @access  Public
export const getStats = async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    const totalSatsangs = await Satsang.countDocuments();
    const upcomingSatsangs = await Satsang.countDocuments({
      date: { $gte: todayStr },
      status: { $ne: 'cancelled' },
    });
    const todaySatsangs = await Satsang.countDocuments({
      date: todayStr,
      status: { $ne: 'cancelled' },
    });
    const cancelledSatsangs = await Satsang.countDocuments({
      status: 'cancelled',
    });
    const totalStates = await State.countDocuments();
    const totalDistricts = await District.countDocuments();

    res.json({
      success: true,
      data: {
        totalSatsangs,
        upcomingSatsangs,
        todaySatsangs,
        cancelledSatsangs,
        totalStates,
        totalDistricts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'आंकड़े लोड करने में त्रुटि हुई।',
    });
  }
};
