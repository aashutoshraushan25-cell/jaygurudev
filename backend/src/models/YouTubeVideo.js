import mongoose from 'mongoose';

const youTubeVideoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    channelTitle: {
      type: String,
      default: 'जय गुरु देव सत्संग (Jay Guru Dev)',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      enum: ['rss', 'manual'],
      default: 'rss',
    },
  },
  {
    timestamps: true,
  }
);

export const YouTubeVideo = mongoose.model('YouTubeVideo', youTubeVideoSchema);
