import express from 'express';
import { therapistController } from '../controllers/index.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Therapist:
 *       type: object
 *       properties:
 *         serviceName:
 *           type: string
 */

/**
 * @swagger
 * /therapist:
 *   get:
 *     summary: Get all Therapist
 *     description: Retrieve a list of all Therapist
 *     tags: [Therapist]
 *     responses:
 *       200:
 *         description: A list of Therapist
 */
router.get('/', therapistController.findAllTherapists);

export { router };
