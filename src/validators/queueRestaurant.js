const { check } = require("express-validator");
const restaurantService = require("../services/restaurant.service");

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
      .notEmpty()
      .withMessage("is empty")
      .bail()
      .custom(restaurantIdIsExists)
      .withMessage("is not exists"),
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
    check("name").notEmpty().withMessage("is empty"),
    check("restaurantId")
      .notEmpty()
      .withMessage("is empty")
      .bail()
      .custom(restaurantIdIsExists)
      .withMessage("is not exists"),
    check("prefix").notEmpty().withMessage("is empty"),
    check("description").optional().isString().withMessage("must be string"),
    check("digit")
      .optional()
      .isInt({ min: 4, max: 10 })
      .withMessage("must be number and value between 4 and 10"),
    check("minSeat")
      .optional()
      .isInt({ min: 1 })
      .withMessage("must be number and value greater than 0"),
  ],
  update: [
    check("name").optional().isString().withMessage("must be string"),
    check("description").optional().isString().withMessage("must be string"),
    check("isActived").optional().isBoolean().withMessage("must be boolean"),
    check("queueSequence")
      .optional()
      .isInt({ min: 1 })
      .withMessage("must be number and value greater than 0"),
    check("currentSequence")
      .optional()
      .isInt({ min: 1 })
      .withMessage("must be number and value greater than 0"),
  ],
};
