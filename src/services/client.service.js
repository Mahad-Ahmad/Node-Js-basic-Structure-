import { HTTP_STATUS_CODES } from '../constants/status-code.constant.js';
import { Client } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

const createDefaultClient = async () => {
  const notes = [
    {
      content:
        'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
      pinned: true
    },
    {
      content: 'Meeting scheduled for next week.',
      pinned: false
    },
    {
      content: 'Update client profile with new contact information',
      pinned: true
    }
  ];

  const giftVouchers = [
    {
      code: 'Y6TM982',
      claimed: true
    },
    {
      code: 'X0WLP1U8',
      claimed: false
    }
  ];

  const clients = [
    {
      firstName: 'Jason',
      lastName: 'Doe',
      profilePictureUrl: 'https://example.com/profile.jpg',
      postCode: '12345',
      mobileNumber: '1234567890',
      telephone: '0987654321',
      email: 'jason.doe@example.com',
      dateOfBirth: new Date(),
      occupation: 'Software Engineer',
      company: 'Example Inc.',
      gender: 'MALE',
      referralSource: 'Friend',
      state: 'California',
      city: 'Los Angeles',
      street: '123 Main St',
      promotions: 'EMAIL',
      newsLetter: 'SMS',
      notes,
      giftVouchers: []
    },
    {
      firstName: 'Megan',
      lastName: 'Smith',
      profilePictureUrl: 'https://example.com/alice.jpg',
      postCode: '54321',
      mobileNumber: '9876543210',
      telephone: '0123456789',
      email: 'megan.smith@example.com',
      dateOfBirth: new Date(),
      occupation: 'Teacher',
      company: 'ABC School',
      gender: 'FEMALE',
      referralSource: 'Online Ad',
      state: 'New York',
      city: 'New York City',
      street: '456 Elm St',
      promotions: 'SMS',
      newsLetter: 'EMAIL',
      notes: [],
      giftVouchers
    }
  ];

  for (const clientObj of clients) {
    try {
      const client = await Client.findOne({ email: clientObj.email });
      if (!client) {
        await Client.create({
          ...clientObj
        });
      }
    } catch (err) {
      next(err);
    }
  }
};

const createClient = async ({ body: data }, res, next) => {
  try {
    const client = await Client.create({
      ...data
    });
    sendResponse(res, client, 'Client created successfully.');
  } catch (err) {
    next(err);
  }
};

const getClientById = async (req, res, next) => {
  const {
    params: { id: _id }
  } = req;
  try {
    const client = await Client.findOne({ _id });
    sendResponse(res, client, 'Client retrieved successfully.');
  } catch (err) {
    next(err);
  }
};

const updateClient = async (req, res, next) => {
  const {
    params: { id: _id },
    body: data
  } = req;
  try {
    const client = await Client.findOneAndUpdate({ _id }, data, { new: true });
    sendResponse(res, client, 'Client Updated Successfully.');
  } catch (err) {
    next(err);
  }
};

const deleteClient = async (req, res, next) => {
  const {
    params: { id: _id }
  } = req;
  try {
    const deleted = await Client.findOneAndDelete({ _id });
    if (!deleted) {
      return {
        status: false,
        message: 'Client with associated ID not found'
      };
    }
    sendResponse(res, deleted, 'Client Deleted Successfully.');
  } catch (err) {
    next(err);
  }
};

const findAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    sendResponse(res, clients, 'Clients retrieved successfully.', HTTP_STATUS_CODES.OK);
  } catch (err) {
    next(err);
  }
};

export {
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  findAllClients,
  createDefaultClient
};
