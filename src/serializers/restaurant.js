const _ = require("lodash");
const queueRestaurantSerializer = require('./queueRestaurant');

module.exports = {
  serialize(restaurants = []) {
    const restaurantSerialized = restaurants.map((restaurant) => {
      return {
        id: restaurant._id.toString(),
        userId: restaurant.userId.toString(),
        ..._.pick(restaurant, ["name", "phone", "coordinates", "isActived"]),
      };
    });
    return {
      restaurants: restaurantSerialized,
    };
  },

  serializeWithQueue(restaurants = [], queueRestaurants = []) {
    const restaurantSerialized = this.serialize(restaurants);
    const queueRestaurantSerialized = queueRestaurantSerializer.serialize(queueRestaurants);
    return {
      ...restaurantSerialized,
      ...queueRestaurantSerialized,
    };
  },
};
