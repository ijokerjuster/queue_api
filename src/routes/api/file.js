const router = require('express').Router();
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fieldSize: 5 * 1024 * 1024,
    }
})

const fileController = require('../../controllers/file.controller');

router.post('/', multer.single('file'), fileController.upload);

module.exports = router;