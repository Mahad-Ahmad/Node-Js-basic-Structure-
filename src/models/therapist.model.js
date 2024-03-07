import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Therapist = new mongoose.model('therapist', therapistSchema);

export default Therapist;
