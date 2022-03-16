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
    if (!_.isNil(keyword)) {
      filter.nameSearch = new RegExp(`^${keyword.toLowerCase()}`);
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
    if (!restaurant || !restaurant.isActived) {
      throw ErrorBadRequest("restaurant is not exists.");
    }
    return restaurant;
  },

  async getByIds(ids = []) {
    const restaurants = await Restaurant.find({
      _id: ids,
      isActived: true,
    })
    if (!restaurants || restaurants.length !== ids.length) {
      throw ErrorBadRequest("some restaurants are not exists.");
    }
    return restaurants;
  },

  async create({ name, userId, phone, coordinates }) {
    const nameSearch = name.toLowerCase();
    const restaurant = await Restaurant.create({
      name,
      nameSearch,
      userId: ObjectId(userId),
      phone,
      coordinates,
    });
    return restaurant;
  },

  async update({ id, name, phone, coordinates }) {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant || !restaurant.isActived) {
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
    if(updateData.name) {
      updateData.nameSearch = updateData.name.toLowerCase();
    }

    const restaurantUpdated = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    return restaurantUpdated;
  },

  async createQueueGroup({
    restaurantId,
    name,
    discription,
    prefix,
    digit,
    minSeat,
  }) {
    const restaurantExists = await this.getById(restaurantId);
    const queuePrefixDupicated = restaurantExists.queueGroups.find(
      (q) => q.isActived === true && q.prefix === prefix
    );
    if (queuePrefixDupicated) {
      throw ErrorBadRequest("prefix is duplicate.");
    }
    const queueMinSeatDuplicated = restaurantExists.queueGroups.find(
      (q) => q.isActived === true && q.minSeat === minSeat
    );
    if (queueMinSeatDuplicated) {
      throw ErrorBadRequest("minSeat is duplicate.");
    }

    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: {
        queueGroups: {
          name,
          discription,
          prefix,
          digit,
          minSeat,
        },
      },
    });

    return restaurant;
  },

  async updateQueueGroup({
    restaurantId,
    id,
    name,
    discription,
    isActived,
    queueSequence,
    currentSequence,
  }) {
    const restaurantExists = await this.getById(restaurantId);
    const queueGroup = restaurantExists.queueGroups.find(
      (q) => q.isActived === true && q._id.toString() === id
    );
    if (!queueGroup) {
      throw ErrorNotFound("queue is not exists.");
    }

    const updateData = _.omitBy(
      {
        name,
        discription,
        isActived,
        queueSequence,
        currentSequence,
      },
      _.isUndefined
    );
    const updateQueueGroupData = Object.keys(updateData).reduce((data, key) => {
      data[`queueGroups.$.${key}`] = updateData[key];
      return data;
    }, {});

    const restaurant = await Restaurant.findOneAndUpdate(
      {
        _id: restaurantId,
        "queueGroups._id": queueGroup._id,
      },
      {
        $set: updateQueueGroupData,
      },
      { new: true }
    );
    return restaurant;
  },

  async removeQueue({ restaurantId, id }) {
    const restaurantExists = await this.getById(restaurantId);
    const queueGroup = restaurantExists.queueGroups.find(
      (q) => q.isActived === true && q._id.toString() === id
    );
    if (!queueGroup) {
      throw ErrorNotFound("queue is not exists.");
    }

    const restaurant = await Restaurant.findOneAndUpdate(
      {
        _id: restaurantId,
        "queueGroups._id": queue._id,
      },
      {
        $set: {
          "queueGroups.$.isActived": false,
        },
      },
      { new: true }
    );
    return restaurant;
  },
};

module.exports = { ...service };
