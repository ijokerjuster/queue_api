const restaurantService = require("../services/restaurant.service");
const restaurantSerializer = require("../serializers/restaurant");
const queueRestaurantService = require("../services/queueRestaurant.service");

const controller = {
  async query(req, res) {
    try {
      req.validate();
      const restaurants = await restaurantService.query(req.query);
      const restaurantSerialized = restaurantSerializer.serialize(restaurants);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await restaurantService.getById(id);
      const restaurantSerialized = restaurantSerializer.serialize([restaurant]);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async create(req, res) {
    try {
      const param = { ...req.body, userId: req.user._id.toString() };
      const restaurant = await restaurantService.create(param);
      const restaurantSerialized = restaurantSerializer.serialize([restaurant]);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async update(req, res) {
    try {
      req.validate();
      const { id } = req.params;
      const restaurant = await restaurantService.update({...req.body, id });
      const restaurantSerialized = restaurantSerializer.serialize([restaurant]);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async queryWithQueue(req, res) {
    try {
      req.validate();
      const restaurants = await restaurantService.query(req.query);
      const restaurantIds = restaurants.map(restaurant => restaurant._id.toString());
      const queueRestaurants = await queueRestaurantService.query({restaurantIds, limit: 100});
      const restaurantSerialized = restaurantSerializer.serializeWithQueue(restaurants, queueRestaurants);
      // res.cookie('cookiename', 'cookievalue', { maxAge: 1000 * 60 * 60, httpOnly: true });
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async getByIdWithQueue(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await restaurantService.getById(id);
      const queueRestaurants = await queueRestaurantService.query({restaurantIds: [id], limit: 10});
      const restaurantSerialized = restaurantSerializer.serializeWithQueue([restaurant], queueRestaurants);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...controller };
