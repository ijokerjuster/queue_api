const passport = require('passport');
const router = require('express').Router();
const user = require('./user');
const restaurant = require('./restaurant');
const queue = require('./queue');
const file = require('./file');

router.use('/users', user);
router.use('/restaurants', restaurant);
router.use('/queues', passport.authenticate('jwt', {session: false}), queue);
router.use('/files', file);

module.exports = router;