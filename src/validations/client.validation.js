import { body } from 'express-validator';
import { GENDER, PROMOTIONS, STATUS } from '../constants/index.js';

export const clientValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('FirstName is required'),
    body('lastName').notEmpty().withMessage('LastName is required'),
    body('postCode').notEmpty().withMessage('PostCode is required'),
    body('promotions')
      .optional()
      .isIn(Object.values(PROMOTIONS))
      .withMessage(`Invalid Promotion value. Valid values: [${Object.values(PROMOTIONS)}]`),
    body('newsLetter')
      .optional()
      .isIn(PROMOTIONS.EMAIL)
      .withMessage('Invalid NewsLetter value. Valid value: [EMAIL]'),
    body('gender')
      .optional()
      .isIn(Object.values(GENDER))
      .withMessage(`Invalid Gender value. Valid value:  [${Object.values(GENDER)}]`),
    body('status')
      .optional()
      .isIn(Object.values(STATUS))
      .withMessage(`Invalid Status value. Valid value:  [${Object.values(STATUS)}]`)
  ];
};
