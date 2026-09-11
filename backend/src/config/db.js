import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 4000,
      });
      console.log(`[MongoDB] Connected to MongoDB at: ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    } catch (err) {
      console.warn(`[MongoDB] Could not connect to configured MONGODB_URI: ${err.message}. Falling back to Memory Server.`);
    }
  }

  // Try local default MongoDB
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/jaygurudev', {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected to local MongoDB at: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.log('[MongoDB] Local MongoDB server not found. Starting embedded MongoDB Memory Server for seamless instant development...');
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`[MongoDB] Embedded In-Memory MongoDB running and connected at ${memUri}`);
      return conn;
    } catch (memErr) {
      console.error('[MongoDB] Fatal error initializing MongoDB:', memErr);
      process.exit(1);
    }
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
