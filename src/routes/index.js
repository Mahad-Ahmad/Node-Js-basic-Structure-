import express from 'express';
import * as authRoute from './user.route.js';
import * as clientRoutes from '../routes/client.route.js';
import * as therapistsRoutes from '../routes/therapist.route.js';
import * as serviceRoutes from '../routes/service.route.js';
import * as roomRoutes from '../routes/room.route.js';

const router = express.Router();

router.use('/auth', authRoute.router);
router.use('/client', clientRoutes.router);
router.use('/therapist', therapistsRoutes.router);
router.use('/service', serviceRoutes.router);
router.use('/room', roomRoutes.router);

export { router };
