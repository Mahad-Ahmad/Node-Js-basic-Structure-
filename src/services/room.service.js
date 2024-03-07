import { Room } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

const createDefaultRoom = async () => {
  const rooms = [
    {
      name: 'Room 1'
    },
    {
      name: 'Room 2'
    },
    {
      name: 'Room 3'
    },
    {
      name: 'Room 4'
    },
    {
      name: 'Room 5'
    }
  ];

  for (const roomObj of rooms) {
    try {
      const room = await Room.findOne({ name: roomObj.name });

      if (!room) {
        await Room.create({
          name: roomObj.name
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

const findAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    sendResponse(res, rooms, 'Rooms retrieved successfully.');
  } catch (err) {
    next(err);
  }
};

export { createDefaultRoom, findAllRooms };
