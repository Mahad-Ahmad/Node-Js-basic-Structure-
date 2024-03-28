import { messageUtility } from './index.js';
import { HTTP_STATUS_CODES } from '../constants/index.js';

const sendResponse = (res, response) => {
  if (!response) {
    return next('inder');
  } else if (response.status) {
    return successResponse(res, response.message, {
      data: response.data
    });
  } else {
    return validationErrorResponse(res, response?.message);
  }
};

const serverErrorResponse = (res, error) => {
  // loggerUtil.error({
  //     message: error.toString(),
  //     level: 'error'
  // })
  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
    status: false,
    error: error.toString(),
    message: messageUtility.serverError
  });
};

const validationErrorResponse = (res, errors) => {
  res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
    status: false,
    error: errors,
    message: messageUtility.validationErrors
  });
};

const badRequestErrorResponse = (res, message) => {
  res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
    status: false,
    message
  });
};

const authorizationErrorResponse = (res, message) => {
  res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
    status: false,
    message
  });
};

const manyRequestErrorResponse = (res, message) => {
  res.status(HTTP_STATUS_CODES.TOO_MANY_REQUESTS).send({
    status: false,
    message
  });
};

const validationFailResponse = (res, message, result) => {
  const response = {
    status: false,
    message
  };
  if (result) {
    response.result = result;
  }
  res.status(HTTP_STATUS_CODES.VALIDATION_FAILED).send(response);
};

const successResponse = (res, message, result) => {
  const response = {
    status: true,
    message
  };
  if (result) {
    response.result = result;
  }
  res.status(200).send(response);
};

const noSuccessResponse = (res, message, result) => {
  const response = {
    status: false,
    message
  };
  if (result) {
    response.result = result;
  }
  res.status(HTTP_STATUS_CODES.OK).send(response);
};

const errorResponse = (res, message, result) => {
  const response = {
    status: false,
    message
  };
  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(response);
};
export {
  successResponse,
  noSuccessResponse,
  validationFailResponse,
  validationErrorResponse,
  errorResponse,
  sendResponse,
  badRequestErrorResponse,
  authorizationErrorResponse,
  manyRequestErrorResponse
};
