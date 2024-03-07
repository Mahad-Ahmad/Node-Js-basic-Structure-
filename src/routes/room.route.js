import express from 'express';
import { roomController } from '../controllers/index.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         roomNo:
 *           type: string
 */

/**
 * @swagger
 * /room:
 *   get:
 *     summary: Get all Rooms
 *     description: Retrieve a list of all Rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: A list of Rooms
 */
router.get('/', roomController.findAllRooms);

export { router };
