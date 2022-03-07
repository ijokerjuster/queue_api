const _ = require("lodash");

module.exports = {
  serialize(queueRestaurants = []) {
    const queueRestaurantSerialized = queueRestaurants.map((queueRestaurant) => {
      return {
        id: queueRestaurant._id.toString(),
        restaurantId: queueRestaurant.restaurantId.toString(),
        ..._.pick(queueRestaurant, ["name", "discription", "queueSequence", "currentSequence", "prefix", "digit", "minSeat", "isActived"]),
      };
    });
    return {
      queueRestaurants: queueRestaurantSerialized,
    };
  },
};
