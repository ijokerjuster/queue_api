const passport = require('passport');
const router = require('express').Router();
const user = require('./user');
const restaurant = require('./restaurant');
const restaurantDetail = require('./restaurantDetail');
const queueRestaurant = require('./queueRestaurant');
const queue = require('./queue');

router.use('/users', user);
router.use('/restaurants', restaurant);
router.use('/restaurant-details', restaurantDetail);
router.use('/queue-restaurants', passport.authenticate('jwt', {session: false}), queueRestaurant);
router.use('/queues', passport.authenticate('jwt', {session: false}), queue);

module.exports = router;