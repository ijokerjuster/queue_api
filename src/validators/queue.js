const { check } = require("express-validator");
const restaurantService = require("../services/restaurant.service");
const { QueueStatus } = require("../models/Queue");

const restaurantIdIsExists = async (value) => {
  try {
    const restaurant = await restaurantService.getById(value);
    return restaurant;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  query: [
    check("restaurantId")
      .optional()
      .custom(restaurantIdIsExists)
      .withMessage("is not exists"),
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
    check("restaurantId")
      .notEmpty()
      .withMessage("is empty")
      .bail()
      .custom(restaurantIdIsExists)
      .withMessage("is not exists"),
    check("fullname").notEmpty().withMessage("is empty"),
    check("phone")
      .notEmpty()
      .withMessage("is empty")
      .isMobilePhone("th-TH")
      .withMessage("must be phone"),
    check("seat")
      .notEmpty()
      .withMessage("is empty")
      .isInt({ min: 1 })
      .withMessage("must be number and value greater than 0"),
  ],
  update: [
    check("fullname").optional().isString().withMessage("must be string"),
    check("phone")
      .optional()
      .isMobilePhone("th-TH")
      .withMessage("must be phone"),

    check("status")
      .optional()
      .isIn(Object.values(QueueStatus))
      .withMessage("is invalid"),
  ],
};
