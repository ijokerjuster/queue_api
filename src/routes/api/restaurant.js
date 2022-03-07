const passport = require('passport');
const router = require('express').Router();
const restaurantController = require('../../controllers/restaurant.controller');
const validator = require('../../validators/restaurant');

const auth = passport.authenticate('jwt', {session: false});

router.get('/', validator.query, restaurantController.query);
router.post('/', auth, validator.create, restaurantController.create);

router.get('/:id', restaurantController.getById);
router.patch('/:id', auth, validator.update, restaurantController.update);

module.exports = router;