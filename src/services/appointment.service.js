import { HTTP_STATUS_CODES } from '../constants/status-code.constant.js';
import { Appointment } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

const createAppointment = async ({ body: data }, res, next) => {
  try {
    const Appointment = await Appointment.create({
      ...data
    });
    sendResponse(res, Appointment, 'Appointment created successfully.');
  } catch (err) {
    next(err);
  }
};

const getAppointmentById = async (req, res, next) => {
  const {
    params: { id: _id }
  } = req;
  try {
    const Appointment = await Appointment.findOne({ _id });
    sendResponse(res, Appointment, 'Appointment retrieved successfully.');
  } catch (err) {
    next(err);
  }
};

const updateAppointment = async (req, res, next) => {
  const {
    params: { id: _id },
    body: data
  } = req;
  try {
    const Appointment = await Appointment.findOneAndUpdate({ _id }, data, { new: true });
    sendResponse(res, Appointment, 'Appointment Updated Successfully.');
  } catch (err) {
    next(err);
  }
};

const deleteAppointment = async (req, res, next) => {
  const {
    params: { id: _id }
  } = req;
  try {
    const deleted = await Appointment.findOneAndDelete({ _id });
    if (!deleted) {
      return {
        status: false,
        message: 'Appointment with associated ID not found'
      };
    }
    sendResponse(res, deleted, 'Appointment Deleted Successfully.');
  } catch (err) {
    next(err);
  }
};

const findAllAppointments = async (req, res, next) => {
  try {
    const clients = await Appointment.find();
    sendResponse(res, clients, 'Clients retrieved successfully.', HTTP_STATUS_CODES.OK);
  } catch (err) {
    next(err);
  }
};

export {
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  findAllAppointments
};
