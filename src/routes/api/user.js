const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const validator = require('../../validators/user');
const { authenticate } = require('../auth');
const multer = require('../multer');

router.get('/', authenticate, validator.query, userController.query);
router.post('/', validator.register, multer.single('file'), userController.register);

router.patch('/me', authenticate, multer.single('file'), userController.update);
router.get('/me', authenticate, userController.getById);

router.put('/password', authenticate, userController.changePassword);

router.get('/auth', authenticate, userController.auth);
router.post('/login', validator.login, userController.login);
router.get('/logout', userController.logout);

module.exports = router;