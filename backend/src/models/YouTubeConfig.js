import mongoose from 'mongoose';

const youTubeConfigSchema = new mongoose.Schema(
  {
    channelId: {
      type: String,
      default: 'UCTP6TFqDUWMxobhpkFjgE0Q',
      trim: true,
    },
    channelUrl: {
      type: String,
      default: 'https://www.youtube.com/@Jaigurudevukm',
      trim: true,
    },
    autoSync: {
      type: Boolean,
      default: true,
    },
    lastSyncAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const YouTubeConfig = mongoose.model('YouTubeConfig', youTubeConfigSchema);
