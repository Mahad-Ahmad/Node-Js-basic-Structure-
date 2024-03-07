import mongoose from 'mongoose';

const appointmentsSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client'
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service'
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'room'
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'therapist'
  },
  paidInFull: { type: Boolean, default: false },
  dateAndTime: {
    type: Date,
    required: true
  }
});

const Appointment = new mongoose.model('appointment', appointmentsSchema);
export default Appointment;
