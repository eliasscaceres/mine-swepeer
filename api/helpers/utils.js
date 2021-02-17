const createResponse = (statusCode, message) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(
    statusCode !== 200 ? { errorMessage: message } : message
  ),
});

export { createResponse };
