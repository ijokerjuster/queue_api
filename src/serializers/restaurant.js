const _ = require("lodash");

module.exports = {
  serializeQueueGroups(queueGroups = []) {
    const queueGroupSerialized = queueGroups.map((q) => {
      return {
        id: q._id.toString(),
        ..._.pick(q, ["name", "discription", "queueSequence", "currentSequence", "prefix", "digit", "minSeat", "isActived"]),
      };
    });
    return queueGroupSerialized;
  },

  serializeRestaurants(restaurants = []) {
    const restaurantSerialized = restaurants.map((restaurant) => {
      const queueGroups = this.serializeQueueGroups(restaurant.queueGroups);
      return {
        id: restaurant._id.toString(),
        userId: restaurant.userId.toString(),
        ..._.pick(restaurant, ["name", "phone", "coordinates", "isActived"]),
        queueGroups,
      };
    });
    return restaurantSerialized
  },

  serialize(restaurants = [], queues = []) {
    const restaurantSerialized = this.serializeRestaurants(restaurants);
    return {
      restaurants: restaurantSerialized,
    };
  },
};
