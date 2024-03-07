import express from 'express';
import { appointmentController } from '../controllers/index.js';
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
router.get('/', appointmentController.findAllAppointments);

router.get('/', appointmentValidationRules, appointmentController.crea);
router.get('/', appointmentController.findAllAppointments);

export { router };
