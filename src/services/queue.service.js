const _ = require('lodash');
const { Queue } = require("../models/Queue");
const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
} = require("../configs/errorMethods");

const service = {
  async query({ keyword, userId, restaurantId, skip = 0, limit = 10 }) {
    const name = _.isNil(keyword) ? null : new RegExp(`^${keyword}`);
    const filter = {
      isActived: true,
      userId,
    };
    if(!_.isNil(keyword)){
      filter.name = name;
    }
    if(!_.isNil(restaurantId)){
      filter.restaurantId = restaurantId;
    }

    const queues = await Queue.find(filter)
      .sort({ sequence: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return queues;
  },

  async create({ restaurantId, userId, fullname, phone, seat, queueRestaurantId, prefix, digit, queueSequence }) {
    const sequence = queueSequence + 1;
    const sequenceText = (`0000000000${sequence}`).slice(-digit);
    const name = `${prefix}${sequenceText}`;

    const queueExists = await this.query({ restaurantId, userId, limit: 1});
    if(queueExists != null && queueExists.length > 0){
      throw ErrorBadRequest("queue is exists");
    }

    const queue = await Queue.create({
      name,
      restaurantId,
      queueRestaurantId,
      userId,
      fullname,
      phone,
      sequence,
      seat,
    });
    return queue;
  },

  async update({ id, fullname, phone, status}) {
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
    
        return queue
  },
};

module.exports = { ...service };
