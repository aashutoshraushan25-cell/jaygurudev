import Announcement from '../models/Announcement.js';

// @desc    Get all active announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'सूचनाएं लोड करने में त्रुटि हुई।',
    });
  }
};

// @desc    Create announcement
// @route   POST /api/announcements
// @access  Private/Admin
export const createAnnouncement = async (req, res) => {
  try {
    const { title_hi, title_en, content_hi, content_en, priority, active } =
      req.body;

    if (!title_hi || !content_hi) {
      return res.status(400).json({
        success: false,
        message: 'कृपया शीर्षक और विवरण भरें।',
      });
    }

    const announcement = await Announcement.create({
      title_hi: title_hi.trim(),
      title_en: (title_en || title_hi).trim(),
      content_hi: content_hi.trim(),
      content_en: (content_en || content_hi).trim(),
      priority: priority || 'normal',
      active: active !== undefined ? active : true,
    });

    res.status(201).json({
      success: true,
      message: 'सूचना सफलतापूर्वक जोड़ी गई।',
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'सूचना नहीं मिली।',
      });
    }

    Object.assign(announcement, req.body);
    await announcement.save();

    res.json({
      success: true,
      message: 'सूचना सफलतापूर्वक अपडेट की गई।',
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'सूचना नहीं मिली।',
      });
    }

    await announcement.deleteOne();

    res.json({
      success: true,
      message: 'सूचना सफलतापूर्वक हटा दी गई।',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
