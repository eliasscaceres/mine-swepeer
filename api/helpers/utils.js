const createResponse = (statusCode, message) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(message),
});

export default { createResponse };
