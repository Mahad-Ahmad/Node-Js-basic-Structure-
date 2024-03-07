import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import * as routes from './routes/index.js';
import { connectDatabase } from './config/index.js';
import {
  userService,
  therapistService,
  serviceService,
  roomService,
  clientService
} from './services/index.js';
import swaggerUi from 'swagger-ui-express';
import { swagger } from './config/index.js';
import { errorHandler } from './utilities/index.js';
import { MESSAGE } from './constants/index.js';

dotenv.config({
  silent: true
});

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', parameterLimit: 1000000, extended: true }));
app.use(express.static('../uploads/media'));
app.use('/', routes.router);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swagger));

app.get('/', (req, res, next) => {
  console.log('Temple-Day-Spa backend is Up!');
  res.status(200).send('Temple-Day-Spa backend is Up!');
});

app.use('*', (req, res, next) => {
  const err = new Error(MESSAGE.ROUTE_NOT_FOUND_ERROR);
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(chalk.blue(` 🚀 Temple-Day-Spa server listening on port: ${process.env.PORT}!`));

      userService.createDefaultAdmin();
      therapistService.createDefaultTherapist();
      serviceService.createDefaultService();
      roomService.createDefaultRoom();
      clientService.createDefaultClient();
    });
  })
  .catch(() => {});

export default app;
