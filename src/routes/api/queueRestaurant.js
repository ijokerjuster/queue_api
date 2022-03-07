const router = require('express').Router();
const queueRestaurantController = require('../../controllers/queueRestaurant.controller');
const validator = require('../../validators/queueRestaurant');

router.get('/', validator.query, queueRestaurantController.query);
router.post('/', validator.create, queueRestaurantController.create);

router.get('/:id', queueRestaurantController.getById);
router.patch('/:id', validator.update, queueRestaurantController.update);

module.exports = router;