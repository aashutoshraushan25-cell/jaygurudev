import Satsang from '../models/Satsang.js';
import State from '../models/State.js';
import District from '../models/District.js';

// Helper to determine status dynamically based on date if not explicitly marked cancelled
const resolveStatus = (satsang) => {
  if (satsang.status === 'cancelled') return 'cancelled';
  const today = new Date().toISOString().split('T')[0];
  if (satsang.date === today) return 'today';
  if (satsang.date > today) return 'upcoming';
  return 'completed';
};

// @desc    Get all Satsang events with search & filters
// @route   GET /api/satsang
// @access  Public
export const getSatsangs = async (req, res) => {
  try {
    const {
      stateId,
      districtId,
      date,
      status,
      search,
      page = 1,
      limit = 20,
      sortBy = 'date',
      sortOrder = 'asc',
      featuredOnly,
    } = req.query;

    const filter = {};

    if (stateId) {
      if (stateId.match(/^[0-9a-fA-F]{24}$/)) {
        filter.stateId = stateId;
      } else {
        const foundState = await State.findOne({
          $or: [
            { code: stateId.toUpperCase() },
            { name: new RegExp(`^${stateId}$`, 'i') },
          ],
        });
        if (foundState) {
          filter.stateId = foundState._id;
        }
      }
    }

    if (districtId) {
      if (districtId.match(/^[0-9a-fA-F]{24}$/)) {
        filter.districtId = districtId;
      } else {
        const foundDistrict = await District.findOne({
          $or: [
            { name: new RegExp(`^${districtId}$`, 'i') },
            { name_en: new RegExp(`^${districtId}$`, 'i') },
            { name_hi: new RegExp(`^${districtId}$`, 'i') },
          ],
        });
        if (foundDistrict) {
          filter.districtId = foundDistrict._id;
        }
      }
    }

    if (date) {
      filter.date = date;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    if (status) {
      if (status === 'upcoming') {
        filter.status = { $ne: 'cancelled' };
        filter.date = { $gte: todayStr };
      } else if (status === 'today') {
        filter.date = todayStr;
        filter.status = { $ne: 'cancelled' };
      } else if (status === 'completed') {
        filter.date = { $lt: todayStr };
      } else {
        filter.status = status;
      }
    }

    if (featuredOnly === 'true') {
      filter.isFeatured = true;
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { title_hi: searchRegex },
        { venue: searchRegex },
        { address: searchRegex },
        { city: searchRegex },
        { village: searchRegex },
        { landmark: searchRegex },
        { organizerName: searchRegex },
        { description: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const total = await Satsang.countDocuments(filter);
    const satsangs = await Satsang.find(filter)
      .populate('stateId', 'name name_hi name_en code')
      .populate('districtId', 'name name_hi name_en')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: satsangs.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: satsangs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'सत्संग सूची लोड करने में समस्या हुई।',
    });
  }
};

// @desc    Get single Satsang by ID
// @route   GET /api/satsang/:id
// @access  Public
export const getSatsangById = async (req, res) => {
  try {
    const satsang = await Satsang.findById(req.params.id)
      .populate('stateId', 'name name_hi name_en code')
      .populate('districtId', 'name name_hi name_en');

    if (!satsang) {
      return res.status(404).json({
        success: false,
        message: 'सत्संग कार्यक्रम नहीं मिला। (Satsang event not found)',
      });
    }

    res.json({
      success: true,
      data: satsang,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Satsangs for specific State
// @route   GET /api/satsang/state/:stateId
// @access  Public
export const getSatsangsByState = async (req, res) => {
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
        ],
      });
    }

    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'राज्य नहीं मिला।',
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const satsangs = await Satsang.find({
      stateId: state._id,
      date: { $gte: todayStr },
      status: { $ne: 'cancelled' },
    })
      .populate('districtId', 'name name_hi name_en')
      .sort({ date: 1 });

    res.json({
      success: true,
      state: state.toJSON(),
      count: satsangs.length,
      data: satsangs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Satsangs for specific District
// @route   GET /api/satsang/district/:districtId
// @access  Public
export const getSatsangsByDistrict = async (req, res) => {
  try {
    const { districtId } = req.params;
    const district = await District.findById(districtId).populate(
      'stateId',
      'name name_hi name_en code'
    );

    if (!district) {
      return res.status(404).json({
        success: false,
        message: 'जिला नहीं मिला।',
      });
    }

    const satsangs = await Satsang.find({ districtId: district._id })
      .populate('stateId', 'name name_hi name_en code')
      .populate('districtId', 'name name_hi name_en')
      .sort({ date: 1 });

    res.json({
      success: true,
      district: district.toJSON(),
      count: satsangs.length,
      data: satsangs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Home Highlights (Today + Featured + Nearest Upcoming)
// @route   GET /api/satsang/highlights
// @access  Public
export const getSatsangHighlights = async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    // Today's Satsangs
    const todaySatsangs = await Satsang.find({
      date: todayStr,
      status: { $ne: 'cancelled' },
    })
      .populate('stateId', 'name name_hi name_en code')
      .populate('districtId', 'name name_hi name_en')
      .sort({ startTime: 1 });

    // Nearest Upcoming Featured
    const upcomingSatsangs = await Satsang.find({
      date: { $gte: todayStr },
      status: { $ne: 'cancelled' },
    })
      .populate('stateId', 'name name_hi name_en code')
      .populate('districtId', 'name name_hi name_en')
      .sort({ date: 1 })
      .limit(6);

    res.json({
      success: true,
      data: {
        today: todaySatsangs,
        upcoming: upcomingSatsangs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new Satsang event
// @route   POST /api/satsang
// @access  Private/Admin
export const createSatsang = async (req, res) => {
  try {
    const {
      title,
      title_hi,
      date,
      startTime,
      endTime,
      stateId,
      districtId,
      city,
      village,
      venue,
      address,
      landmark,
      googleMapsUrl,
      organizerName,
      organizerPhone,
      description,
      imageUrl,
      status,
      isFeatured,
    } = req.body;

    if (!title || !date || !startTime || !endTime || !stateId || !districtId || !venue || !address || !organizerName || !organizerPhone) {
      return res.status(400).json({
        success: false,
        message: 'कृपया सभी आवश्यक फ़ील्ड भरें (शीर्षक, दिनांक, समय, राज्य, जिला, स्थान, पता, आयोजक का नाम व फोन)।',
      });
    }

    // Check valid state & district
    const state = await State.findById(stateId);
    if (!state) {
      return res.status(400).json({ success: false, message: 'चयनित राज्य अमान्य है।' });
    }

    const district = await District.findById(districtId);
    if (!district) {
      return res.status(400).json({ success: false, message: 'चयनित जिला अमान्य है।' });
    }

    const autoStatus = status || resolveStatus({ date, status: 'upcoming' });

    const newSatsang = await Satsang.create({
      title: title.trim(),
      title_hi: (title_hi || title).trim(),
      date,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      stateId,
      districtId,
      city: (city || '').trim(),
      village: (village || '').trim(),
      venue: venue.trim(),
      address: address.trim(),
      landmark: (landmark || '').trim(),
      googleMapsUrl: (googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(`${venue}, ${city || ''}, ${state.name}`)}`).trim(),
      organizerName: organizerName.trim(),
      organizerPhone: organizerPhone.trim(),
      description: description || '',
      imageUrl: imageUrl || '',
      status: autoStatus,
      isFeatured: !!isFeatured,
    });

    const populated = await Satsang.findById(newSatsang._id)
      .populate('stateId', 'name name_hi name_en code')
      .populate('districtId', 'name name_hi name_en');

    res.status(201).json({
      success: true,
      message: 'सत्संग कार्यक्रम सफलतापूर्वक सहेजा गया।',
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'सत्संग जोड़ने में त्रुटि हुई।',
    });
  }
};

// @desc    Update Satsang event
// @route   PUT /api/satsang/:id
// @access  Private/Admin
export const updateSatsang = async (req, res) => {
  try {
    const satsang = await Satsang.findById(req.params.id);

    if (!satsang) {
      return res.status(404).json({
        success: false,
        message: 'सत्संग कार्यक्रम नहीं मिला।',
      });
    }

    const {
      title,
      title_hi,
      date,
      startTime,
      endTime,
      stateId,
      districtId,
      city,
      village,
      venue,
      address,
      landmark,
      googleMapsUrl,
      organizerName,
      organizerPhone,
      description,
      imageUrl,
      status,
      isFeatured,
    } = req.body;

    if (stateId) {
      const state = await State.findById(stateId);
      if (!state) return res.status(400).json({ success: false, message: 'चयनित राज्य अमान्य है।' });
      satsang.stateId = stateId;
    }

    if (districtId) {
      const district = await District.findById(districtId);
      if (!district) return res.status(400).json({ success: false, message: 'चयनित जिला अमान्य है।' });
      satsang.districtId = districtId;
    }

    if (title !== undefined) satsang.title = title.trim();
    if (title_hi !== undefined) satsang.title_hi = title_hi.trim();
    if (date !== undefined) satsang.date = date;
    if (startTime !== undefined) satsang.startTime = startTime.trim();
    if (endTime !== undefined) satsang.endTime = endTime.trim();
    if (city !== undefined) satsang.city = city.trim();
    if (village !== undefined) satsang.village = village.trim();
    if (venue !== undefined) satsang.venue = venue.trim();
    if (address !== undefined) satsang.address = address.trim();
    if (landmark !== undefined) satsang.landmark = landmark.trim();
    if (googleMapsUrl !== undefined) satsang.googleMapsUrl = googleMapsUrl.trim();
    if (organizerName !== undefined) satsang.organizerName = organizerName.trim();
    if (organizerPhone !== undefined) satsang.organizerPhone = organizerPhone.trim();
    if (description !== undefined) satsang.description = description;
    if (imageUrl !== undefined) satsang.imageUrl = imageUrl;
    if (status !== undefined) satsang.status = status;
    if (isFeatured !== undefined) satsang.isFeatured = !!isFeatured;

    await satsang.save();

    const populated = await Satsang.findById(satsang._id)
      .populate('stateId', 'name name_hi name_en code')
      .populate('districtId', 'name name_hi name_en');

    res.json({
      success: true,
      message: 'सत्संग कार्यक्रम सफलतापूर्वक अपडेट किया गया।',
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'सत्संग अपडेट करने में त्रुटि हुई।',
    });
  }
};

// @desc    Delete Satsang event
// @route   DELETE /api/satsang/:id
// @access  Private/Admin
export const deleteSatsang = async (req, res) => {
  try {
    const satsang = await Satsang.findById(req.params.id);

    if (!satsang) {
      return res.status(404).json({
        success: false,
        message: 'सत्संग कार्यक्रम नहीं मिला।',
      });
    }

    await satsang.deleteOne();

    res.json({
      success: true,
      message: 'सत्संग कार्यक्रम सफलतापूर्वक हटा दिया गया।',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
