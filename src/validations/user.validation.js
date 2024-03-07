import { body } from 'express-validator';

const signUpValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('FirstName is required'),
    body('lastName').notEmpty().withMessage('LastName is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];
};

const signInValidationRules = () => {
  return [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];
};

export { signUpValidationRules, signInValidationRules };
