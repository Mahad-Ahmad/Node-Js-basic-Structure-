import mongoose from 'mongoose';
import { ROLES } from '../constants/index.js';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.keys(ROLES),
      default: ROLES.ADMIN,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

const User = new mongoose.model('user', userSchema);

export default User;
