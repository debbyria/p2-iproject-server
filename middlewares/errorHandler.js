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
    case "USER_NOT_FOUND":
      res.status(401).json({
        message: "Email or Password Invalid"
      })
      break;
    case "Authentication failed":
      res.status(401).json({
        message: "Authentication failed"
      });
      break;
    default:
      res.status(500).json({
        message: "Internal Server Error"
      });
  }
}

module.exports = errorHandler