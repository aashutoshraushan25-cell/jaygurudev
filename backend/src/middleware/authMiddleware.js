import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'अनधिकृत प्रवेश। कृपया पहले लॉगिन करें। (Unauthorized: No token provided)',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'jay_guru_dev_spiritual_secret_key_2026'
    );
    const user = await User.findById(decoded.id).select('-passwordHash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'यूजर नहीं मिला। (User not found)',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें। (Invalid or expired token)',
    });
  }
};
