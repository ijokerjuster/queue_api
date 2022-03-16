const { check, body } = require("express-validator");

module.exports = {
  query: [
    check("keyword").optional().isString().withMessage("must be string"),
    check("skip")
      .optional()
      .isInt({ min: 0 })
      .withMessage("must be number and value greater than -1"),
    check("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("must be number and value greater than 0"),
  ],
  register: [
    // check("username")
    //   .notEmpty()
    //   .withMessage("is empty")
    //   .isLength({ min: 5, max: 50 })
    //   .withMessage("must be between 5-100 characters"),
    // check("password")
    //   .notEmpty()
    //   .withMessage("is empty")
    //   .isLength({ min: 5, max: 50 })
    //   .withMessage("must be between 5-100 characters"),
    // check("name")
    //   .notEmpty()
    //   .withMessage("is empty")
    //   .isLength({ min: 5, max: 200 })
    //   .withMessage("must be between 5-200 characters"),
    // check("email")
    //   .notEmpty()
    //   .withMessage("is empty")
    //   .isEmail()
    //   .withMessage("must be email")
    //   .isLength({ min: 5, max: 200 })
    //   .withMessage("must be between 5-200 characters"),
    // check("phone")
    //   .notEmpty()
    //   .withMessage("is empty")
    //   .isMobilePhone()
    //   .withMessage("must be phone"),
  ],
  update: [
    check("name")
      .optional()
      .isString()
      .withMessage("must be string")
      .isLength({ min: 5, max: 200 })
      .withMessage("must be between 5-200 characters"),
    check("email")
      .optional()
      .isEmail()
      .withMessage("must be email")
      .isLength({ min: 5, max: 200 })
      .withMessage("must be between 5-200 characters"),
    check("phone").optional().isMobilePhone().withMessage("must be phone"),
  ],
  changePassword: [
    check("oldpassword")
      .notEmpty()
      .withMessage("is empty"),
    check("password")
      .notEmpty()
      .withMessage("is empty")
      .isLength({ min: 5, max: 50 })
      .withMessage("must be between 5-100 characters"),
  ],
  login: [
    check("username").notEmpty().withMessage("is empty"),
    check("password").notEmpty().withMessage("is empty"),
  ],
};
