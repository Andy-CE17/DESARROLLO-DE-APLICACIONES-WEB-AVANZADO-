const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Error interno del servidor",
  });
};

module.exports = errorHandler;
