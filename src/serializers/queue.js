const _ = require('lodash');
const restaurantSerializer = require('./restaurant');

module.exports = {
  serializeQueues(queues = []) {
    const queueSerialized = queues.map((queue) => {
      return {
        id: queue._id.toString(),
        restaurantId: queue.restaurantId.toString(),
        queueGroupId: queue.queueGroupId.toString(),
        userId: queue.userId.toString(),
        ..._.pick(queue, ["name", "fullname", "phone", "sequence", "seat", "isActived", "status"]),
      };
    });
    return queueSerialized;
  },

    serialize(queues = [], restaurants = []) {
      const restaurantSerialized = restaurantSerializer.serializeRestaurants(restaurants);
      const queueSerialized = this.serializeQueues(queues);
      return {
        restaurants: restaurantSerialized,
        queues: queueSerialized,
      };
    },
  };
  