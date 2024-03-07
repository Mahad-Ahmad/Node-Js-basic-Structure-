import { Therapist } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

const createDefaultTherapist = async () => {
  const therapists = [
    {
      name: 'John Doe'
    },
    {
      name: 'Jason'
    },
    {
      name: 'Alice'
    },
    {
      name: 'James'
    },
    {
      name: 'Peter'
    }
  ];

  for (const therapistObj of therapists) {
    try {
      const therapist = await Therapist.findOne({ name: therapistObj.name });

      if (!therapist) {
        await Therapist.create({
          name: therapistObj.name
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

const findAllTherapists = async (req, res, next) => {
  try {
    const therapists = await Therapist.find();
    sendResponse(res, therapists, 'Therapists retrieved successfully.');
  } catch (err) {
    next(err);
  }
};

export { createDefaultTherapist, findAllTherapists };
