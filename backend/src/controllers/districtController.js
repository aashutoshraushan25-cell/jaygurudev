import District from '../models/District.js';
import State from '../models/State.js';
import Satsang from '../models/Satsang.js';

// @desc    Get all districts (optionally filtered by stateId)
// @route   GET /api/districts
// @access  Public
export const getDistricts = async (req, res) => {
  try {
    const { stateId } = req.query;
    const filter = {};

    if (stateId) {
      if (stateId.match(/^[0-9a-fA-F]{24}$/)) {
        filter.stateId = stateId;
      } else {
        const foundState = await State.findOne({
          $or: [
            { code: stateId.toUpperCase() },
            { name: new RegExp(`^${stateId}$`, 'i') },
            { name_hi: new RegExp(`^${stateId}$`, 'i') },
            { name_en: new RegExp(`^${stateId}$`, 'i') },
          ],
        });
        if (foundState) {
          filter.stateId = foundState._id;
        } else {
          filter.stateId = null;
        }
      }
    }

    const districts = await District.find(filter)
      .populate('stateId', 'name name_hi name_en code')
      .sort({ name_en: 1 });

    // Calculate upcoming satsang counts and next satsang date for each district
    const todayStr = new Date().toISOString().split('T')[0];

    const satsangs = await Satsang.find({
      status: { $in: ['upcoming', 'today'] },
    }).sort({ date: 1 });

    const countMap = {};
    const nextDateMap = {};

    satsangs.forEach((sat) => {
      const dId = sat.districtId?._id ? sat.districtId._id.toString() : sat.districtId?.toString();
      if (!dId) return;
      countMap[dId] = (countMap[dId] || 0) + 1;
      if (!nextDateMap[dId]) {
        nextDateMap[dId] = sat.date;
      }
    });

    const districtsWithMeta = districts.map((d) => ({
      ...d.toJSON(),
      upcomingCount: countMap[d._id.toString()] || 0,
      nextSatsangDate: nextDateMap[d._id.toString()] || null,
    }));

    res.json({
      success: true,
      data: districtsWithMeta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'जिलों की सूची लोड करने में त्रुटि हुई।',
    });
  }
};

// @desc    Get districts by state ID or code
// @route   GET /api/states/:stateId/districts
// @access  Public
export const getDistrictsByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    let state = null;

    if (stateId.match(/^[0-9a-fA-F]{24}$/)) {
      state = await State.findById(stateId);
    } else {
      state = await State.findOne({
        $or: [
          { code: stateId.toUpperCase() },
          { name: new RegExp(`^${stateId}$`, 'i') },
          { name_hi: new RegExp(`^${stateId}$`, 'i') },
          { name_en: new RegExp(`^${stateId}$`, 'i') },
        ],
      });
    }

    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'राज्य नहीं मिला। (State not found)',
      });
    }

    const districts = await District.find({ stateId: state._id }).sort({
      name_en: 1,
    });

    const satsangs = await Satsang.find({
      stateId: state._id,
      status: { $in: ['upcoming', 'today'] },
    }).sort({ date: 1 });

    const countMap = {};
    const nextDateMap = {};

    satsangs.forEach((sat) => {
      const dId = sat.districtId?._id ? sat.districtId._id.toString() : sat.districtId?.toString();
      if (!dId) return;
      countMap[dId] = (countMap[dId] || 0) + 1;
      if (!nextDateMap[dId]) {
        nextDateMap[dId] = sat.date;
      }
    });

    const districtsWithMeta = districts.map((d) => ({
      ...d.toJSON(),
      state,
      upcomingCount: countMap[d._id.toString()] || 0,
      nextSatsangDate: nextDateMap[d._id.toString()] || null,
    }));

    res.json({
      success: true,
      state: state.toJSON(),
      data: districtsWithMeta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single district by ID
// @route   GET /api/districts/:id
// @access  Public
export const getDistrictById = async (req, res) => {
  try {
    const district = await District.findById(req.params.id).populate(
      'stateId',
      'name name_hi name_en code'
    );

    if (!district) {
      return res.status(404).json({
        success: false,
        message: 'जिला नहीं मिला। (District not found)',
      });
    }

    const upcomingCount = await Satsang.countDocuments({
      districtId: district._id,
      status: { $in: ['upcoming', 'today'] },
    });

    res.json({
      success: true,
      data: {
        ...district.toJSON(),
        upcomingCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new district
// @route   POST /api/districts
// @access  Private/Admin
export const createDistrict = async (req, res) => {
  try {
    const { name, name_hi, name_en, stateId } = req.body;

    if (!name && !name_en) {
      return res.status(400).json({
        success: false,
        message: 'जिले का नाम आवश्यक है। (District name is required)',
      });
    }

    if (!stateId) {
      return res.status(400).json({
        success: false,
        message: 'राज्य का चयन आवश्यक है। (State selection is required)',
      });
    }

    const state = await State.findById(stateId);
    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'चयनित राज्य नहीं मिला। (Selected state not found)',
      });
    }

    const districtName = (name_en || name).trim();
    const existing = await District.findOne({
      name: districtName,
      stateId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'इस राज्य में यह जिला पहले से मौजूद है। (District already exists in this state)',
      });
    }

    const district = await District.create({
      name: districtName,
      name_en: districtName,
      name_hi: (name_hi || districtName).trim(),
      stateId,
    });

    res.status(201).json({
      success: true,
      message: 'जिला सफलतापूर्वक जोड़ा गया।',
      data: district,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update district
// @route   PUT /api/districts/:id
// @access  Private/Admin
export const updateDistrict = async (req, res) => {
  try {
    const { name, name_hi, name_en, stateId } = req.body;
    const district = await District.findById(req.params.id);

    if (!district) {
      return res.status(404).json({
        success: false,
        message: 'जिला नहीं मिला।',
      });
    }

    if (stateId) {
      const state = await State.findById(stateId);
      if (!state) {
        return res.status(404).json({
          success: false,
          message: 'राज्य नहीं मिला।',
        });
      }
      district.stateId = stateId;
    }

    if (name || name_en) district.name = (name_en || name).trim();
    if (name_en) district.name_en = name_en.trim();
    if (name_hi) district.name_hi = name_hi.trim();

    await district.save();

    res.json({
      success: true,
      message: 'जिला सफलतापूर्वक अपडेट किया गया।',
      data: district,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete district
// @route   DELETE /api/districts/:id
// @access  Private/Admin
export const deleteDistrict = async (req, res) => {
  try {
    const district = await District.findById(req.params.id);

    if (!district) {
      return res.status(404).json({
        success: false,
        message: 'जिला नहीं मिला।',
      });
    }

    // Check if satsangs exist under this district
    const satsangCount = await Satsang.countDocuments({
      districtId: district._id,
    });
    if (satsangCount > 0) {
      return res.status(400).json({
        success: false,
        message: `इस जिले में ${satsangCount} सत्संग कार्यक्रम जुड़े हैं। पहले उन कार्यक्रमों को हटाएं।`,
      });
    }

    await district.deleteOne();

    res.json({
      success: true,
      message: 'जिला सफलतापूर्वक हटा दिया गया।',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
