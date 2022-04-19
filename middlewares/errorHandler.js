function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      res.status(400).json({
        message: err.message
      });
      break;
    case "SequelizeValidationError":
      let errors = err.errors.map((el) => {
        return el.message;
      });
      res.status(400).json({
        message: errors
      });
      break;
    default:
      res.status(500).json({
        error: {
          message: "Internal Server Error",
        },
      });
  }
}

module.exports = errorHandler