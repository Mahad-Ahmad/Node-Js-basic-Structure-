import mongoose from 'mongoose';
import { PROMOTIONS } from '../constants/promotions.constant.js';
import { GENDER, STATUS } from '../constants/index.js';

const noteSchema = new mongoose.Schema(
  {
    content: { type: String },
    pinned: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

const clientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePictureUrl: { type: String },
    postCode: { type: String, required: true },
    mobileNumber: { type: String },
    telephone: { type: String },
    email: { type: String },
    status: { type: String, enum: Object.values(STATUS) },
    dateOfBirth: { type: String },
    occupation: { type: String },
    company: { type: String },
    gender: { type: String, enum: Object.values(GENDER) },
    referralSource: { type: String },
    state: { type: String },
    city: { type: String },
    street: { type: String },
    promotions: { type: String, enum: Object.values(PROMOTIONS) },
    newsLetter: { type: String, enum: Object.values(PROMOTIONS) },
    notes: [noteSchema], // Reference to the noteSchema
    giftVouchers: [
      {
        code: { type: String },
        claimed: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

const Client = mongoose.model('client', clientSchema);

export default Client;
