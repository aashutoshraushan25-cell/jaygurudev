import dotenv from 'dotenv';
import { connectDB, closeDB } from '../config/db.js';
import { seedDatabase } from './seedData.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    await seedDatabase();
    console.log('Seeding finished successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

run();
