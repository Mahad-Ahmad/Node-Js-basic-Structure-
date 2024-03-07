import { body } from 'express-validator';

export const appointmentValidationRules = () => {
  return [
    body('clientId').notEmpty().withMessage('Client is required'),
    body('serviceId').notEmpty().withMessage('Service is required'),
    body('roomId').notEmpty().withMessage('Room is required'),
    body('therapistId').notEmpty().withMessage('Therapist is required'),
    body('dateAndTime').notEmpty().withMessage('dateAndTime is required')
  ];
};
