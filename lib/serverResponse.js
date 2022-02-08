const serverResponse = {
  serverFailure: (res, error) => res.status(500).json({
    status: 'error',
    message: 'Something went wrong while processing your request',
    error,
  }),
  failedRequest: (res, status, message, data = {}) => res.status(status).json({
    status: 'fail',
    message,
    data,
  }),
  successfulRequest: (res, status, message, data = {}) => res.status(status).json({
    status: 'success',
    message,
    data,
  })
};

export default serverResponse;
