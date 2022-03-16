const restaurantService = require("../services/restaurant.service");
const queueService = require("../services/queue.service");
const restaurantSerializer = require("../serializers/restaurant");


const controller = {
  async query(req, res) {
    try {
      req.validate();
      const restaurants = await restaurantService.query(req.query);
      let queues = [];
      if(req.user && restaurants.length > 0){
        const restaurantIds = restaurants.map((restaurant) => restaurant._id.toString());
        queues = await queueService.query({ restaurantIds, userId: req.user._id.toString() });
      }
      const restaurantSerialized = restaurantSerializer.serialize(restaurants, queues);
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
      const restaurant = await restaurantService.update({ ...req.body, id });
      const restaurantSerialized = restaurantSerializer.serialize([restaurant]);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async createQueueGroup(req, res) {
    try {
      req.validate();
      const { id: restaurantId } = req.params;
      const restaurant = await restaurantService.createQueueGroup({...req.body, restaurantId});
      const restaurantSerialized = restaurantSerializer.serialize([restaurant]);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async updateQueueGroup(req, res) {
    try {
      req.validate();
      const { id: restaurantId, queueId: id } = req.params;
      const restaurant = await restaurantService.updateQueueGroup({...req.body, restaurantId, id});
      const restaurantSerialized = restaurantSerializer.serialize([restaurant]);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async removeQueueGroup(req, res) {
    try {
      req.validate();
      const { id: restaurantId, queueId: id } = req.params;
      const restaurant = await restaurantService.removeQueueGroup({restaurantId, id});
      const restaurantSerialized = restaurantSerializer.serialize([restaurant]);
      res.success(restaurantSerialized);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...controller };
