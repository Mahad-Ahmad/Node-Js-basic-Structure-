import { appointmentService } from '../services/index.js';

const createAppointment = async (req, res, next) => {
  await appointmentService.createAppointment(req, res, next);
};

const getAppointmentById = async (req, res, next) => {
  await appointmentService.getAppointmentById(req, res, next);
};

const updateAppointment = async (req, res, next) => {
  await appointmentService.updateAppointment(req, res, next);
};

const deleteAppointment = async (req, res, next) => {
  await appointmentService.deleteAppointment(req, res, next);
};

const findAllAppointments = async (req, res, next) => {
  await appointmentService.findAllAppointments(req, res, next);
};

export {
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  findAllAppointments
};
