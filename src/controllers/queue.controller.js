const queueService = require("../services/queue.service");
const queueRestaurantService = require("../services/queueRestaurant.service");
const queueSerializer = require("../serializers/queue");

const controller = {
  async query(req, res) {
    try {
      req.validate();
      const userId = req.user._id.toString();
      const queues = await queueService.query({...req.query, userId});
      // const queueRestaurantIds = queues.map(queue => queue._id.toString());

      // const queueRestaurants = queueRestaurantIds.length === 0? [] : await queueRestaurantService.getByIds(queueRestaurantIds);

      const queueSerialized = queueSerializer.serialize(queues);
      res.success(queueSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async create(req, res) {
    try {
      req.validate();
      const userId = req.user._id.toString();
      const { restaurantId, seat } = req.body;
      const queueRestaurant = await queueRestaurantService.getBySeat({ restaurantId, seat });
      const { prefix, digit, _id, queueSequence } = queueRestaurant;
      const queueRestaurantId = _id.toString();
      const queue = await queueService.create({ ...req.body, prefix, digit, queueRestaurantId, queueSequence, userId });
      await queueRestaurantService.update({ id: queueRestaurantId, queueSequence: queue.sequence });
      const queueSerialized = queueSerializer.serialize([queue]);
      res.success(queueSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async update(req, res) {
    try {
      req.validate();
      const userId = req.user._id.toString();
      const queue = await queueService.update({...req.body, userId});
      const queueSerialized = queueSerializer.serialize([queue]);
      res.success(queueSerialized);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...controller };
