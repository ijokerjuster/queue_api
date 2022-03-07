const _ = require('lodash');

module.exports = {
    serialize(queues = []) {
      const queueSerialized = queues.map((queue) => {
        return {
          id: queue._id.toString(),
          restaurantId: queue.restaurantId.toString(),
          queueRestaurantId: queue.queueRestaurantId.toString(),
          userId: queue.userId.toString(),
          ..._.pick(queue, ["name", "fullname", "phone", "sequence", "seat", "isActived", "status"]),
        };
      });
      return {
        queues: queueSerialized,
      };
    },
  };
  