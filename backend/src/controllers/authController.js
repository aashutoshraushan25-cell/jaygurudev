import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'jay_guru_dev_spiritual_secret_key_2026',
    { expiresIn: '30d' }
  );
};

// Helper to serialize user response
const formatUserResponse = (user, token) => ({
  id: user._id,
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || '',
  photoUrl: user.photoUrl || '',
  city: user.city || '',
  district: user.district || '',
  state: user.state || '',
  customQuote: user.customQuote || '',
  ...(token ? { token } : {}),
});

// @desc    Register a new public devotee / user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, photoUrl, city, district, state } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'कृपया नाम, ईमेल और पासवर्ड दर्ज करें। (Please enter name, email and password)',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: cleanEmail });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'इस ईमेल से पहले ही खाता बना हुआ है। कृपया लॉगिन करें। (Account already exists)',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash: password,
      role: 'user',
      phone: phone ? phone.trim() : '',
      photoUrl: photoUrl || '',
      city: city ? city.trim() : '',
      district: district ? district.trim() : '',
      state: state ? state.trim() : '',
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'जय गुरु देव! आपका खाता सफलतापूर्वक बन गया है।',
      data: formatUserResponse(user, token),
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'पंजीकरण में त्रुटि हुई। कृपया पुनः प्रयास करें।',
    });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'कृपया ईमेल/मोबाइल और पासवर्ड दोनों दर्ज करें।',
      });
    }

    const cleanInput = email.toLowerCase().trim();
    // Allow login by email or phone
    const user = await User.findOne({
      $or: [{ email: cleanInput }, { phone: cleanInput }],
    });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      return res.json({
        success: true,
        message: 'सफलतापूर्वक लॉगिन हो गया।',
        data: formatUserResponse(user, token),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'ईमेल/मोबाइल अथवा पासवर्ड अमान्य है। (Invalid credentials)',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'लॉगिन में त्रुटि हुई। कृपया पुनः प्रयास करें।',
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'उपयोगकर्ता नहीं मिला।' });
    }
    return res.json({
      success: true,
      data: formatUserResponse(user),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'प्रोफाइल लोड करने में त्रुटि' });
  }
};

// @desc    Update current user profile (photo, name, location, etc.)
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'उपयोगकर्ता नहीं मिला।' });
    }

    const { name, phone, photoUrl, city, district, state, customQuote, password } = req.body;

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (photoUrl !== undefined) user.photoUrl = photoUrl;
    if (city !== undefined) user.city = city.trim();
    if (district !== undefined) user.district = district.trim();
    if (state !== undefined) user.state = state.trim();
    if (customQuote !== undefined) user.customQuote = customQuote.trim();

    if (password && password.trim()) {
      user.passwordHash = password.trim();
    }

    await user.save();

    return res.json({
      success: true,
      message: 'प्रोफाइल सफलतापूर्वक अपडेट हो गई!',
      data: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'प्रोफाइल अपडेट करने में समस्या हुई।',
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = async (req, res) => {
  res.json({
    success: true,
    message: 'सफलतापूर्वक लॉगआउट हो गया। (Logged out successfully)',
  });
};
