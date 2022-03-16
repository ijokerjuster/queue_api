const router = require('express').Router();
const restaurantController = require('../../controllers/restaurant.controller');
const validator = require('../../validators/restaurant');
const { authenticate, authenticateWithOptinal } = require('../auth');

router.get('/', validator.query, authenticateWithOptinal, restaurantController.query);
router.post('/', authenticate, validator.create, restaurantController.create);

router.get('/:id/', restaurantController.getById);
router.patch('/:id/', authenticate, validator.update, restaurantController.update);

router.post('/:id/queue-groups/', authenticate, validator.createQueue, restaurantController.createQueueGroup);
router.patch('/:id/queue-groups/:queueId', authenticate, validator.updateQueue, restaurantController.updateQueueGroup);
router.delete('/:id/queue-groups/:queueId', authenticate, restaurantController.removeQueueGroup);

module.exports = router;