const _ = require("lodash");
const ObjectId = require("mongoose").Types.ObjectId;
const QueueRestaurant = require("../models/QueueRestaurant");
const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
} = require("../configs/errorMethods");

const service = {
  async query({ restaurantIds = [], skip = 0, limit = 10 }) {
    const filter = {
      isActived: true,
      restaurantId: restaurantIds,
    };
    const queueRestaurants = await QueueRestaurant.find(filter)
      .sort({ restaurantId: 1, minSeat: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return queueRestaurants;
  },

  async getById(id) {
    const queueRestaurant = await QueueRestaurant.findById(id).lean();
    if (!queueRestaurant || !queueRestaurant.isActived) {
      throw ErrorBadRequest("queue is not exists.");
    }
    return queueRestaurant;
  },

  async getByIds(ids = []) {
    const queueRestaurants = await QueueRestaurant.find({
      _id: ids,
      isActived: true,
    }).lean();
    if (!queueRestaurants || ids.length !== queueRestaurants.length) {
      throw ErrorBadRequest("queues are not exists.");
    }
    return queueRestaurants;
  },

  async create({ restaurantId, name, discription, prefix, digit, minSeat }) {
    const queueRestaurantExists = await QueueRestaurant.find({
      isActived: true,
      restaurantId,
      $or: [
        {
          prefix
        },
        {
          minSeat
        }
      ]
    }, {_id: 1}).lean();

    if(queueRestaurantExists && queueRestaurantExists.find(o => o.prefix === prefix)){
      throw ErrorBadRequest("prefix is duplicate.");
    }
    if(queueRestaurantExists && queueRestaurantExists.find(o => o.minSeat === minSeat)){
      throw ErrorBadRequest("minSeat is duplicate.");
    }

    const queueRestaurant = await QueueRestaurant.create({
      restaurantId: ObjectId(restaurantId),
      name,
      discription,
      prefix,
      digit,
      minSeat,
    });
    return queueRestaurant;
  },

  async update({ id, name, discription, isActived, queueSequence, currentSequence }) {
    const queueRestaurant = await QueueRestaurant.findById(id);
    if (!queueRestaurant || !queueRestaurant.isActived) {
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

    const queueRestaurantUpdated = await QueueRestaurant.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    return queueRestaurantUpdated;
  },

  async getBySeat({restaurantId, seat}) {
    const queueRestaurant = await QueueRestaurant.find({
      isActived: true,
      restaurantId,
      minSeat: {$lte: seat},
    }).sort({ minSeat: -1 }).limit(1).lean()
    if (!queueRestaurant || queueRestaurant.length === 0) {
      throw ErrorBadRequest("queue is not exists.");
    }
    return queueRestaurant[0];
  },
};

module.exports = { ...service };
