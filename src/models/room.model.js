import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Room = new mongoose.model('room', roomSchema);

export default Room;
