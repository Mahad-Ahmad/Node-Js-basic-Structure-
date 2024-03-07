import mongoose from 'mongoose';

const serviveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Servive = new mongoose.model('servive', serviveSchema);

export default Servive;
