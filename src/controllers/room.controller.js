import { roomService } from '../services/index.js';

const findAllRooms = async (req, res, next) => {
  await roomService.findAllRooms(req, res, next);
};

export { findAllRooms };
