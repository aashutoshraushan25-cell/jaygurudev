import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    name_hi: {
      type: String,
      required: true,
      trim: true,
    },
    name_en: {
      type: String,
      required: true,
      trim: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Unique compound index so no duplicate district in same state
districtSchema.index({ name: 1, stateId: 1 }, { unique: true });

districtSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const District = mongoose.model('District', districtSchema);
export default District;
