
const logger = require("./logger");

const unknownEndpoint = (request, _response, next) => {
  !request.route ? next(new Error("unknown route")) : next();
};



const errorHandler = (error, _request, response, next) => {
  logger.error(error);

  let statusCode = 500;

  if (
    error.name === "ValidatorError" ||
    error.name === "CastError" ||
    error.name === "ReferenceError"
  ) {
    statusCode = 400;

  } 
  response.status(statusCode).json({ error: true, message: error.message });
};


module.exports = { errorHandler,unknownEndpoint}; 