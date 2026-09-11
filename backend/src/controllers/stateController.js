import State from '../models/State.js';
import District from '../models/District.js';
import Satsang from '../models/Satsang.js';

// @desc    Get all states with upcoming satsang count
// @route   GET /api/states
// @access  Public
export const getStates = async (req, res) => {
  try {
    const states = await State.find({}).sort({ name_en: 1 });

    // Aggregate satsangs count per state
    const satsangCounts = await Satsang.aggregate([
      {
        $match: { status: { $in: ['upcoming', 'today'] } },
      },
      {
        $group: {
          _id: '$stateId',
          upcomingCount: { $sum: 1 },
        },
      },
    ]);

    const countMap = {};
    satsangCounts.forEach((sc) => {
      countMap[sc._id.toString()] = sc.upcomingCount;
    });

    const statesWithCounts = states.map((state) => ({
      ...state.toJSON(),
      upcomingCount: countMap[state._id.toString()] || 0,
    }));

    res.json({
      success: true,
      data: statesWithCounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'राज्यों की सूची लोड करने में त्रुटि हुई।',
    });
  }
};

// @desc    Get single state by ID or Code
// @route   GET /api/states/:id
// @access  Public
export const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    let state = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      state = await State.findById(id);
    } else {
      // Find by code (e.g. "BR") or name case-insensitive
      state = await State.findOne({
        $or: [
          { code: id.toUpperCase() },
          { name: new RegExp(`^${id}$`, 'i') },
        ],
      });
    }

    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'राज्य नहीं मिला। (State not found)',
      });
    }

    const upcomingCount = await Satsang.countDocuments({
      stateId: state._id,
      status: { $in: ['upcoming', 'today'] },
    });

    res.json({
      success: true,
      data: {
        ...state.toJSON(),
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

// @desc    Create new state
// @route   POST /api/states
// @access  Private/Admin
export const createState = async (req, res) => {
  try {
    const { name, name_hi, name_en, code, description } = req.body;

    if (!name && !name_en) {
      return res.status(400).json({
        success: false,
        message: 'राज्य का नाम आवश्यक है। (State name is required)',
      });
    }

    const stateName = (name_en || name).trim();
    const stateCode = (code || stateName.substring(0, 2)).toUpperCase().trim();

    const exists = await State.findOne({
      $or: [{ name: stateName }, { code: stateCode }],
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'यह राज्य या कोड पहले से मौजूद है। (State or code already exists)',
      });
    }

    const state = await State.create({
      name: stateName,
      name_en: stateName,
      name_hi: (name_hi || stateName).trim(),
      code: stateCode,
      description: description || '',
    });

    res.status(201).json({
      success: true,
      message: 'राज्य सफलतापूर्वक जोड़ा गया।',
      data: state,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update state
// @route   PUT /api/states/:id
// @access  Private/Admin
export const updateState = async (req, res) => {
  try {
    const { name, name_hi, name_en, code, description } = req.body;
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'राज्य नहीं मिला।',
      });
    }

    if (name || name_en) state.name = (name_en || name).trim();
    if (name_en) state.name_en = name_en.trim();
    if (name_hi) state.name_hi = name_hi.trim();
    if (code) state.code = code.toUpperCase().trim();
    if (description !== undefined) state.description = description;

    await state.save();

    res.json({
      success: true,
      message: 'राज्य का विवरण सफलतापूर्वक अपडेट किया गया।',
      data: state,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete state
// @route   DELETE /api/states/:id
// @access  Private/Admin
export const deleteState = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'राज्य नहीं मिला।',
      });
    }

    // Check if districts exist under this state
    const districtCount = await District.countDocuments({ stateId: state._id });
    if (districtCount > 0) {
      return res.status(400).json({
        success: false,
        message: `इस राज्य में ${districtCount} जिले जुड़े हैं। पहले संबंधित जिलों को हटाएं या स्थानांतरित करें।`,
      });
    }

    await state.deleteOne();

    res.json({
      success: true,
      message: 'राज्य सफलतापूर्वक हटा दिया गया।',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
