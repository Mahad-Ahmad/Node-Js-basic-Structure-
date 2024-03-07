import { Service } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

const createDefaultService = async () => {
  const services = [
    {
      name: 'MASSAGE'
    },
    {
      name: 'SPA'
    }
  ];

  for (const serviceObj of services) {
    try {
      let service = await Service.findOne({ name: serviceObj.name });

      if (!service) {
        await Service.create({
          name: serviceObj.name
        });
      }
    } catch (err) {
      return {
        status: false,
        message: 'something went wrong',
        err
      };
    }
  }
};

const findAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    sendResponse(res, services, 'Services retrieved successfully.');
  } catch (err) {
    next(err);
  }
};

export { createDefaultService, findAllServices };
