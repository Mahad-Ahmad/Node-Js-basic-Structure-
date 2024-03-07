import { serviceService } from '../services/index.js';

const findAllServices = async (req, res, next) => {
  await serviceService.findAllServices(req, res, next);
};

export { findAllServices };
