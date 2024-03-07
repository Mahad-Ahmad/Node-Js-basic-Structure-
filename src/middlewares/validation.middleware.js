import { MESSAGE } from '../constants/index.js';
import { HTTP_STATUS_CODES } from '../constants/status-code.constant.js';
import { APIError } from '../utilities/index.js';
import { validationResult } from 'express-validator';

const checkValidationResult = (req, res, next) => {
  if (req.customValidationErrors?.length > 0) {
    throw new APIError({
      errors: req.customValidationErrors,
      message: MESSAGE.VALIDATION_ERROR,
      status: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new APIError({
      errors: errors.array(),
      message: MESSAGE.VALIDATION_ERROR,
      status: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY
    });
  }
  next();
};

export { checkValidationResult };
