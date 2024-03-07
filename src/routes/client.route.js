import express from 'express';
import dotenv from 'dotenv';
import * as clientController from '../controllers/client.controller.js';
import { clientValidationRules } from '../validations/client.validation.js';
import { validateMiddleware } from '../middlewares/index.js';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Client
 *   description: Operations related to clients
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         profilePictureUrl:
 *           type: string
 *         postCode:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         telephone:
 *           type: string
 *         email:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *         occupation:
 *           type: string
 *         company:
 *           type: string
 *         gender:
 *           type: string
 *           enum:
 *             - MALE
 *             - FEMALE
 *             - NON BINARY
 *             - PREFER NOT TO SAY
 *         referralSource:
 *           type: string
 *         state:
 *           type: string
 *         city:
 *           type: string
 *         street:
 *           type: string
 *         promotions:
 *           type: string
 *           enum:
 *             - SMS
 *             - EMAIL
 *         newsLetter:
 *           type: string
 *           enum:
 *             - EMAIL
 *         notes:
 *           type: object
 *           properties:
 *              content:
 *                  type: string
 *              pinned:
 *                  type: boolean
 */

/**
 * @swagger
 * /client:
 *   post:
 *     summary: Create a new client
 *     description: Create a new client record
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  '/',
  clientValidationRules(),
  validateMiddleware.checkValidationResult,
  clientController.createClient
);

/**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Get a client by ID
 *     description: Retrieve a client by its ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the client to retrieve
 *     responses:
 *       200:
 *         description: A client object
 *       404:
 *         description: Client not found
 */
router.get('/:id', clientController.getClientById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         profilePictureUrl:
 *           type: string
 *         postCode:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         telephone:
 *           type: string
 *         email:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *         occupation:
 *           type: string
 *         company:
 *           type: string
 *         gender:
 *           type: string
 *           enum:
 *             - MALE
 *             - FEMALE
 *             - OTHER
 *         referralSource:
 *           type: string
 *         state:
 *           type: string
 *         city:
 *           type: string
 *         street:
 *           type: string
 *         promotions:
 *           type: string
 *           enum:
 *             - EMAIL
 *         newsLetter:
 *           type: boolean
 */

/**
 * @swagger
 * /client/{id}:
 *   put:
 *     summary: Update a client by ID
 *     description: Update a client's information by its ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the client to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client' # assuming you have a schema defined for your client
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Client not found
 */
router.put(
  '/:id',
  clientValidationRules(),
  validateMiddleware.checkValidationResult,
  clientController.updateClient
);

/**
 * @swagger
 * /client/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     description: Delete a client by its ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the client to delete
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 */
router.delete('/:id', clientController.deleteClient);

/**
 * @swagger
 * /client:
 *   get:
 *     summary: Get all clients
 *     description: Retrieve a list of all clients
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: A list of clients
 */
router.get('/', clientController.findAllClients);

export { router };
