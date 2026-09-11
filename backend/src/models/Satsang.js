import mongoose from 'mongoose';
import './State.js';
import './District.js';

const satsangSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    title_hi: {
      type: String,
      trim: true,
    },
    date: {
      type: String, // format YYYY-MM-DD for easy and reliable date queries and sorting
      required: true,
      index: true,
    },
    startTime: {
      type: String, // e.g. "06:00 PM"
      required: true,
    },
    endTime: {
      type: String, // e.g. "08:00 PM"
      required: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true,
      index: true,
    },
    districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true,
      index: true,
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    village: {
      type: String,
      trim: true,
      default: '',
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
      default: '',
    },
    googleMapsUrl: {
      type: String,
      trim: true,
      default: '',
    },
    organizerName: {
      type: String,
      required: true,
      trim: true,
    },
    organizerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['upcoming', 'today', 'completed', 'cancelled'],
      default: 'upcoming',
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

satsangSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const Satsang = mongoose.model('Satsang', satsangSchema);
export default Satsang;
