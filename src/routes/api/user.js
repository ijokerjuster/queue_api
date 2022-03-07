const router = require('express').Router();
const passport = require('passport');
const userController = require('../../controllers/user.controller');
const validator = require('../../validators/user');

router.get('/', passport.authenticate('jwt', {session: false}), validator.query, userController.query);
router.post('/', validator.register, userController.register);

router.patch('/me', passport.authenticate('jwt', {session: false}), userController.update);
router.get('/me', passport.authenticate('jwt', {session: false}), userController.getById);

router.get('/auth', passport.authenticate('jwt', {session: false}), userController.auth);
router.post('/login', validator.login, userController.login);
router.get('/logout', userController.logout);

module.exports = router;