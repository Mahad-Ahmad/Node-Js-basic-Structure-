import express from 'express';
import { serviceController } from '../controllers/index.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 */

/**
 * @swagger
 * /service:
 *   get:
 *     summary: Get all Services
 *     description: Retrieve a list of all Services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of Services
 */
router.get('/', serviceController.findAllServices);

export { router };
