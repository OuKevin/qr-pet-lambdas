export const handler = async (event) => {
  // TODO implement
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda 1!!!'),
  };
  return response;
};
