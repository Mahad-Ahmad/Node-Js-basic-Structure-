import express from 'express';
import { userController } from '../controllers/index.js';
import { userValidationRules } from '../validations/index.js';
import { validateMiddleware } from '../middlewares/index.js';
export const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       properties:
 *         firstName:
 *             type: string
 *             description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *     SignIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in as User
 *     description: Sign in as User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       200:
 *         description: Sign in successfully
 *       400:
 *         description: Bad request
 */
router.post(
  '/sign-in',
  userValidationRules.signInValidationRules(),
  validateMiddleware.checkValidationResult,
  userController.signIn
);

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Create a new User
 *     description: Create a new User record
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  '/sign-up',
  userValidationRules.signUpValidationRules(),
  validateMiddleware.checkValidationResult,
  userController.signUp
);
