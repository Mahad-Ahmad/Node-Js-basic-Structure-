class ApiResponse {
  constructor(data, statusCode, message = 'success') {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

const sendResponse = (res, data, message, statusCode) => {
  const status = statusCode ? statusCode : 200;
  res.status(status).json(new ApiResponse(data, status, message));
};

export default sendResponse;
