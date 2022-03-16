const router = require('express').Router();
const queueController = require('../../controllers/queue.controller');
const validator = require('../../validators/queue');

router.get('/', validator.query, queueController.query);
router.post('/', validator.create, queueController.create);
router.patch('/:id', validator.update, queueController.update);
router.delete('/:id', queueController.delete);

module.exports = router;