const queueRestaurantService = require("../services/queueRestaurant.service");
const queueRestaurantSerializer = require("../serializers/queueRestaurant");

const controller = {
  async query(req, res) {
    try {
      req.validate();
      const {restaurantId, ...params} = req.query;
      const queueRestaurants = await queueRestaurantService.query({...params, restaurantIds: [restaurantId]});
      const queueRestaurantSerialized = queueRestaurantSerializer.serialize(queueRestaurants);
      res.success(queueRestaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const queueRestaurant = await queueRestaurantService.getById(id);
      const queueRestaurantSerialized = queueRestaurantSerializer.serialize([queueRestaurant]);
      res.success(queueRestaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async create(req, res) {
    try {
      req.validate();
      const queueRestaurant = await queueRestaurantService.create(req.body);
      const queueRestaurantSerialized = queueRestaurantSerializer.serialize([queueRestaurant]);
      res.success(queueRestaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async update(req, res) {
    try {
      req.validate();
      const queueRestaurant = await queueRestaurantService.update(req.body);
      const queueRestaurantSerialized = queueRestaurantSerializer.serialize([queueRestaurant]);
      res.success(queueRestaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...controller };
