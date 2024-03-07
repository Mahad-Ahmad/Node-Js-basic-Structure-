import { therapistService } from '../services/index.js';

const findAllTherapists = async (req, res, next) => {
  await therapistService.findAllTherapists(req, res, next);
};

export { findAllTherapists };
