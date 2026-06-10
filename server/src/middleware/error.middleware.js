const { env } = require('../config/env.config');

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found — ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${statusCode}] ${message}`, err.stack);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { notFoundHandler, errorHandler };
