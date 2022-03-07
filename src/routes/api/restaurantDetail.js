const router = require('express').Router();
const restaurantController = require('../../controllers/restaurant.controller');
const validator = require('../../validators/restaurant');

router.get('/', validator.query, restaurantController.queryWithQueue);
router.get('/:id', restaurantController.getByIdWithQueue);

module.exports = router;