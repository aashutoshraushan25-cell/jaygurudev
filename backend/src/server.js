import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seedData.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import stateRoutes from './routes/stateRoutes.js';
import districtRoutes from './routes/districtRoutes.js';
import satsangRoutes from './routes/satsangRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import youtubeRoutes from './routes/youtubeRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'जय गुरु देव सत्संग पोर्टल बैकएंड सक्रिय है (Jay Guru Dev API is active)',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/satsang', satsangRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/youtube', youtubeRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🙏 जय गुरु देव (JAY GURU DEV) API SERVER RUNNING 🙏`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🌍 Health: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
