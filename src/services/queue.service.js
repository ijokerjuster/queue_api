const _ = require("lodash");
const ObjectId = require("mongoose").Types.ObjectId;
const { Queue, QueueStatus } = require("../models/Queue");
const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
} = require("../configs/errorMethods");

const service = {
  async query({ keyword, userId, restaurantIds = [], skip = 0, limit = 10 }) {
    const name = _.isNil(keyword) ? null : new RegExp(`^${keyword}`);
    const filter = {
      isActived: true,
      userId,
    };
    if (!_.isNil(keyword)) {
      filter.name = name;
    }
    if (!_.isNil(restaurantIds) && restaurantIds.length > 0) {
      filter.restaurantId = restaurantIds.map((res) => ObjectId(res));
    }

    const queues = await Queue.find(filter)
      .sort({ sequence: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return queues;
  },

  async create({ userId, fullname, phone, seat, restaurant }) {
    if (!restaurant || !restaurant.isActived) {
      throw ErrorNotFound("restaurant is not exists.");
    }
    const queueGrups = restaurant.queueGroups.filter(
      (q) => q.isActived && q.minSeat <= seat
    );
    if (queueGrups.length === 0) {
      throw ErrorNotFound("queue of restaurant is not avilable");
    }
    const restaurantId = restaurant._id.toString();
    const {
      queueSequence,
      digit,
      _id: queueGroupId,
      prefix,
    } = queueGrups.sort((a, b) => (a.minSeat < b.minSeat ? 1 : -1))[0];

    const sequence = queueSequence + 1;
    const sequenceText = `0000000000${sequence}`.slice(-digit);
    const name = `${prefix}${sequenceText}`;

    const queueExists = await this.query({
      restaurantIds: [restaurantId],
      userId,
      limit: 1,
    });
    if (queueExists != null && queueExists.length > 0) {
      throw ErrorBadRequest("queue is exists");
    }

    const queue = await Queue.create({
      name,
      restaurantId,
      queueGroupId: queueGroupId.toString(),
      userId,
      fullname,
      phone,
      sequence,
      seat,
    });
    return queue;
  },

  async update({ id, fullname, phone, status }) {
    const queueExists = await Queue.findById(id);
    if (!queueExists || !queueExists.isActived) {
      throw ErrorNotFound("queue is not exists.");
    }

    const updateData = _.omitBy(
      {
        fullname,
        phone,
        status,
      },
      _.isUndefined
    );

    const queue = await Queue.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return queue;
  },

  async delete({ id, status = QueueStatus.CANCEL}) {
    const queueExists = await Queue.findById(id);
    if (!queueExists || !queueExists.isActived) {
      throw ErrorNotFound("queue is not exists.");
    }

    const queue = await Queue.findByIdAndUpdate(id, {
      status,
      isActived: false,
    }, {
      new: true,
    });

    return queue;
  },
};

module.exports = { ...service };
