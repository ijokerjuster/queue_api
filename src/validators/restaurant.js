const { check } = require("express-validator");

module.exports = {
  query: [
    check("keyword")
      .optional()
      .isString()
      .withMessage("must be string")
      .isLength({ min: 1, max: 50 })
      .withMessage("must be between 1-50 characters"),
    check("skip")
      .optional()
      .isInt({ min: 0 })
      .withMessage("must be number and value greater than -1"),
    check("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("must be number and value greater than 0"),
  ],
  create: [
    check("name")
      .notEmpty()
      .withMessage("is empty")
      .isLength({ min: 1, max: 500 })
      .withMessage("must be between 1-500 characters"),
    check("phone")
      .optional()
      .isMobilePhone("th-TH")
      .withMessage("must be phone"),

  ],
  update: [
    check("id").notEmpty().withMessage("is empty"),
    check("name")
      .optional()
      .isString()
      .withMessage("must be string")
      .isLength({ min: 1, max: 500 })
      .withMessage("must be between 1-500 characters"),
    check("phone")
      .optional()
      .isMobilePhone("th-TH")
      .withMessage("must be phone"),
  ],
};
