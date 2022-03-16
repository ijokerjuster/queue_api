const queueService = require("../services/queue.service");
const restaurantService = require("../services/restaurant.service");
const queueSerializer = require("../serializers/queue");

const controller = {
  async query(req, res) {
    try {
      req.validate();
      const userId = req.user._id.toString();
      const queues = await queueService.query({ ...req.query, userId });
      const queueRestaurantIds = queues.map((queue) =>
        queue.restaurantId.toString()
      );
      const restaurants =
        queueRestaurantIds.length === 0
          ? []
          : await restaurantService.getByIds(queueRestaurantIds);
      const queueSerialized = queueSerializer.serialize(queues, restaurants);
      res.success(queueSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async create(req, res) {
    try {
      req.validate();
      const userId = req.user._id.toString();
      const { restaurantId } = req.body;
      const restaurant = await restaurantService.getById(restaurantId);
      const queue = await queueService.create({
        ...req.body,
        userId,
        restaurant,
      });
      const restaurantUpdated = await restaurantService.updateQueueGroup({
        id: queue.queueGroupId.toString(),
        restaurantId,
        queueSequence: queue.sequence,
      });
      const queueSerialized = queueSerializer.serialize(
        [queue],
        [restaurantUpdated]
      );
      res.success(queueSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async update(req, res) {
    try {
      req.validate();
      const userId = req.user._id.toString();
      const { id } = req.params;
      const queue = await queueService.update({ ...req.body, id, userId });
      const restaurant = await restaurantService.getById(queue.restaurantId);
      const queueSerialized = queueSerializer.serialize([queue], [restaurant]);
      res.success(queueSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async delete(req, res) {
    try {
      req.validate();
      const { id } = req.params;
      const queue = await queueService.delete({ id });
      const queueSerialized = queueSerializer.serialize([queue]);
      res.success(queueSerialized);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...controller };
