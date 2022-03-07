const _ = require("lodash");
const ObjectId = require("mongoose").Types.ObjectId;
const Restaurant = require("../models/Restaurant");
const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
} = require("../configs/errorMethods");

const service = {
  async query({ keyword, skip = 0, limit = 10 }) {
    const filter = {
      isActived: true,
    };
    if(!_.isNil(keyword)){
      filter.name = new RegExp(`^${keyword}`);
    }
    const restaurants = await Restaurant.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return restaurants;
  },

  async getById(id) {
    const restaurant = await Restaurant.findById(id).lean();
    if (!restaurant || !restaurant.isActived ) {
      throw ErrorBadRequest("restaurant is not exists.");
    }
    return restaurant;
  },

  async create({ name, userId, phone, coordinates }) {
    const restaurant = await Restaurant.create({
      name,
      userId: ObjectId(userId),
      phone,
      coordinates,
    });
    return restaurant;
  },

  async update({ id, name, phone, coordinates }) {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant || !restaurant.isActived ) {
      throw ErrorNotFound("restaurant is not exists.");
    }

    const updateData = _.omitBy(
      {
        name,
        phone,
        coordinates,
      },
      _.isUndefined
    );

    const restaurantUpdated = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return restaurantUpdated;
  },
};

module.exports = { ...service };
