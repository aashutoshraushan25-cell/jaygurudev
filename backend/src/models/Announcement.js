import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title_hi: {
      type: String,
      required: true,
      trim: true,
    },
    title_en: {
      type: String,
      required: true,
      trim: true,
    },
    content_hi: {
      type: String,
      required: true,
    },
    content_en: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    priority: {
      type: String,
      enum: ['normal', 'high', 'urgent'],
      default: 'normal',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

announcementSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
