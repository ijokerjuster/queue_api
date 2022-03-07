const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  req.validate = () => {
    const errors = validationResult(req).array();
    if (errors.length == 0) return;
    let error = new Error(`${errors[0].param} ${errors[0].msg}`);
    error.status = 422;
    throw error;
  };

  next();
};
