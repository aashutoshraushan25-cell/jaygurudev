export const notFound = (req, res, next) => {
  const error = new Error(`पेज या एंडपॉइंट नहीं मिला - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'कुछ समस्या हुई है। कृपया थोड़ी देर बाद पुनः प्रयास करें।',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
